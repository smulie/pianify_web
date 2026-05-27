"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

interface LACampaign {
  id: string;
  name: string;
  targetAudience: string;
  testUserId?: string;
  scheduledTime: string;
  status: string;
  template: {
    uiType: string;
    attributes: {
      lessonName: string;
      mascotVariant: string;
    };
    contentState: {
      statusMessage: string;
      progress: number;
      streakCount: number;
      hoursInactive?: number;
      themeColor?: string;
      deadlineMs?: number | null;
      titleMessage?: string;
    };
    alertTitle: string;
    alertBody: string;
  };
}

const DEFAULT_CAMPAIGN: LACampaign = {
  id: "",
  name: "",
  targetAudience: "test_user",
  testUserId: "",
  scheduledTime: "",
  status: "pending",
  template: {
    uiType: "streak_risk_critical",
    attributes: {
      lessonName: "Pianify Streak",
      mascotVariant: "ios_widget_angry"
    },
    contentState: {
      statusMessage: "🔥 Sắp mất chuỗi Streak!",
      progress: 0.0,
      streakCount: 0,
      hoursInactive: 0,
      themeColor: "dark",
      deadlineMs: null
    },
    alertTitle: "Streak at Risk! 🔥",
    alertBody: "Keep your streak alive!"
  }
};

export default function LiveActivityCampaignsPage() {
  const [campaigns, setCampaigns] = useState<LACampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCampaign, setEditingCampaign] = useState<LACampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deadlineString, setDeadlineString] = useState("");

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "system/push_config/la_campaigns");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LACampaign));
      data.sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching LA campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign || !editingCampaign.id) return;
    
    try {
      // Process deadline string to timestamp
      const campaignToSave = { ...editingCampaign };
      if (deadlineString) {
        campaignToSave.template.contentState.deadlineMs = new Date(deadlineString).getTime();
      } else {
        campaignToSave.template.contentState.deadlineMs = null;
      }

      const docRef = doc(db, "system/push_config/la_campaigns", editingCampaign.id);
      await setDoc(docRef, campaignToSave);
      setIsModalOpen(false);
      fetchCampaigns();
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Failed to save campaign.");
    }
  };

  const handleDelete = async (id: string, status: string) => {
    if (status !== "pending") {
      alert("Chỉ có thể xóa chiến dịch đang ở trạng thái pending (chưa chạy)!");
      return;
    }
    if (!confirm("Bạn có chắc chắn muốn xóa chiến dịch này?")) return;
    try {
      await deleteDoc(doc(db, "system/push_config/la_campaigns", id));
      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("Failed to delete campaign.");
    }
  };

  const openModal = (campaign?: LACampaign) => {
    if (campaign) {
      setEditingCampaign(JSON.parse(JSON.stringify(campaign)));
      if (campaign.template.contentState.deadlineMs) {
        const d = new Date(campaign.template.contentState.deadlineMs);
        setDeadlineString(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0,16));
      } else {
        setDeadlineString("");
      }
    } else {
      const defaultTime = new Date(Date.now() + 30 * 60000);
      setEditingCampaign(JSON.parse(JSON.stringify({ 
        ...DEFAULT_CAMPAIGN, 
        id: `lacamp_${Date.now()}`,
        scheduledTime: defaultTime.toISOString()
      })));
      setDeadlineString("");
    }
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "processing": return "#3b82f6";
      case "completed": return "#10b981";
      case "failed": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Chiến dịch Live Activity</h1>
        <button 
          onClick={() => openModal()}
          style={{ padding: "10px 16px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          ⏱️ Lên lịch Live Activity
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ background: "#252239", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#1e1c31", borderBottom: "1px solid #403d5c" }}>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Tên chiến dịch</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Giờ kích hoạt (Local)</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>UI Type</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Trạng thái</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "16px", textAlign: "center", color: "#a1a1aa" }}>Chưa có chiến dịch nào.</td>
                </tr>
              ) : (
                campaigns.map((camp) => (
                  <tr key={camp.id} style={{ borderBottom: "1px solid #403d5c" }}>
                    <td style={{ padding: "16px" }}>
                      <strong>{camp.name}</strong>
                      <div style={{ fontSize: "12px", color: "#a1a1aa", marginTop: "4px" }}>Alert: {camp.template.alertTitle}</div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      {new Date(camp.scheduledTime).toLocaleString()}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 8px", background: "#3f3f46", borderRadius: "4px", fontSize: "12px" }}>
                        {camp.template.uiType}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ 
                        padding: "4px 8px", 
                        background: getStatusColor(camp.status) + "20", 
                        color: getStatusColor(camp.status),
                        border: `1px solid ${getStatusColor(camp.status)}40`,
                        borderRadius: "4px", 
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "uppercase"
                      }}>
                        {camp.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button 
                        onClick={() => openModal(camp)} 
                        disabled={camp.status !== "pending"}
                        style={{ marginRight: "12px", background: "transparent", border: "none", color: camp.status === "pending" ? "#60a5fa" : "#4b5563", cursor: camp.status === "pending" ? "pointer" : "not-allowed" }}
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={() => handleDelete(camp.id, camp.status)} 
                        disabled={camp.status !== "pending"}
                        style={{ background: "transparent", border: "none", color: camp.status === "pending" ? "#f87171" : "#4b5563", cursor: camp.status === "pending" ? "pointer" : "not-allowed" }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingCampaign && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "20px" }}>
          <div style={{ background: "#252239", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "800px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
              {editingCampaign.id.startsWith("lacamp_") && editingCampaign.name === "" ? "Lên lịch Live Activity" : "Sửa Live Activity"}
            </h2>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              {/* Cấu hình chung */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tên chiến dịch (Nội bộ)</label>
                  <input required value={editingCampaign.name} onChange={e => setEditingCampaign({...editingCampaign, name: e.target.value})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="VD: Countdown Tết" />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Hẹn giờ bắn (Local)</label>
                  <input type="datetime-local" required value={editingCampaign.scheduledTime ? new Date(new Date(editingCampaign.scheduledTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,16) : ""} onChange={e => {
                    if (e.target.value) {
                      setEditingCampaign({...editingCampaign, scheduledTime: new Date(e.target.value).toISOString()});
                    }
                  }} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Đối tượng (Target)</label>
                  <select value={editingCampaign.targetAudience} onChange={e => setEditingCampaign({...editingCampaign, targetAudience: e.target.value})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                    <option value="test_user">Gửi cho 1 người (Test User)</option>
                    <option value="all_users">Tất cả người dùng (All)</option>
                    <option value="inactive_3_days">Chưa học 3 ngày (Inactive)</option>
                  </select>
                </div>
              </div>

              {editingCampaign.targetAudience === "test_user" && (
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nhập UID của người nhận</label>
                  <input required value={editingCampaign.testUserId || ""} onChange={e => setEditingCampaign({...editingCampaign, testUserId: e.target.value})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="VD: yfkXQjR6nwv2ZlV4igvC" />
                </div>
              )}

              <div style={{ borderTop: "1px solid #403d5c", margin: "8px 0" }}></div>

              {/* Template UI Type */}
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0", marginBottom: "16px" }}>Giao diện (UI Type)</h3>
                <select value={editingCampaign.template.uiType} onChange={e => setEditingCampaign({
                  ...editingCampaign, 
                  template: { ...editingCampaign.template, uiType: e.target.value }
                })} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                  <option value="streak_risk_critical">Khẩn cấp đứt Streak (streak_risk_critical)</option>
                  <option value="retention">Tương tác hàng ngày (retention)</option>
                  <option value="onboarding">Chào đón (onboarding)</option>
                  <option value="menu">Mặc định (menu)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", background: "#1e1c31", padding: "16px", borderRadius: "8px", border: "1px solid #403d5c" }}>
                
                {/* Attributes */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#9ca3af", marginBottom: "12px" }}>Dữ liệu tĩnh (Attributes)</h4>
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Lesson Name (Góc trên)</label>
                  <input required value={editingCampaign.template.attributes.lessonName} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, attributes: { ...editingCampaign.template.attributes, lessonName: e.target.value } }
                  })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Mascot Variant</label>
                  <select value={editingCampaign.template.attributes.mascotVariant} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, attributes: { ...editingCampaign.template.attributes, mascotVariant: e.target.value } }
                  })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }}>
                    <option value="mascot">Bình thường (mascot)</option>
                    <option value="fire">Lửa (fire)</option>
                    <option value="ios_widget_angry">Tức giận (ios_widget_angry)</option>
                    <option value="ios_widget_danger_crying_hard">Khóc (ios_widget_danger_crying_hard)</option>
                    <option value="ios_widget_danger_passiveaggressive">Dỗi (ios_widget_danger_passiveaggressive)</option>
                    <option value="ios_widget_flow_encourage">Động viên (ios_widget_flow_encourage)</option>
                    <option value="ios_widget_idea">Ý tưởng (ios_widget_idea)</option>
                    <option value="ios_widget_checklist">Checklist (ios_widget_checklist)</option>
                    <option value="ios_widget_win_maestro">Chiến thắng (ios_widget_win_maestro)</option>
                    <option value="ios_widget_win_maestro_ftue">Chiến thắng FTUE (ios_widget_win_maestro_ftue)</option>
                  </select>
                </div>

                {/* Content State */}
                <div style={{ gridColumn: "1 / -1", marginTop: "12px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#9ca3af", marginBottom: "12px" }}>Dữ liệu động (Content State)</h4>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Status Message (Mô tả ngắn)</label>
                  <input required value={editingCampaign.template.contentState.statusMessage} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, contentState: { ...editingCampaign.template.contentState, statusMessage: e.target.value } }
                  })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Progress (0.0 - 1.0)</label>
                  <input type="number" step="0.01" min="0" max="1" required value={editingCampaign.template.contentState.progress} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, contentState: { ...editingCampaign.template.contentState, progress: parseFloat(e.target.value) } }
                  })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Streak Count</label>
                  <input type="number" required value={editingCampaign.template.contentState.streakCount} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, contentState: { ...editingCampaign.template.contentState, streakCount: parseInt(e.target.value, 10) } }
                  })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Deadline (Bật đồng hồ đếm ngược)</label>
                  <input type="datetime-local" value={deadlineString} onChange={e => setDeadlineString(e.target.value)} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                </div>

                {editingCampaign.template.uiType === "retention" && (
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Hours Inactive (Xanh=6, Vàng=8, Đỏ=10)</label>
                    <input type="number" value={editingCampaign.template.contentState.hoursInactive || 0} onChange={e => setEditingCampaign({
                      ...editingCampaign, template: { ...editingCampaign.template, contentState: { ...editingCampaign.template.contentState, hoursInactive: parseInt(e.target.value, 10) } }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                  </div>
                )}

                {editingCampaign.template.uiType === "onboarding" && (
                  <>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Title Message (Tiêu đề chào mừng)</label>
                      <input value={editingCampaign.template.contentState.titleMessage || ""} onChange={e => setEditingCampaign({
                        ...editingCampaign, template: { ...editingCampaign.template, contentState: { ...editingCampaign.template.contentState, titleMessage: e.target.value } }
                      })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Theme Color</label>
                      <select value={editingCampaign.template.contentState.themeColor || "pink"} onChange={e => setEditingCampaign({
                        ...editingCampaign, template: { ...editingCampaign.template, contentState: { ...editingCampaign.template.contentState, themeColor: e.target.value } }
                      })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }}>
                        <option value="pink">Pink</option>
                        <option value="blue">Blue</option>
                        <option value="white">White</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </>
                )}

              </div>

              {/* Alert Data */}
              <div style={{ borderTop: "1px solid #403d5c", margin: "8px 0" }}></div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0" }}>Thông báo nổi (Push Alert)</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tiêu đề (Title)</label>
                  <input required value={editingCampaign.template.alertTitle} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, alertTitle: e.target.value }
                  })} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nội dung (Body)</label>
                  <input required value={editingCampaign.template.alertBody} onChange={e => setEditingCampaign({
                    ...editingCampaign, template: { ...editingCampaign.template, alertBody: e.target.value }
                  })} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #403d5c", color: "#fff", borderRadius: "8px", cursor: "pointer" }}>Hủy</button>
                <button type="submit" style={{ padding: "10px 20px", background: "#f59e0b", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Lưu Live Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
