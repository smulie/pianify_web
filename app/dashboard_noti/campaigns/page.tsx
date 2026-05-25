"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

interface Campaign {
  id: string;
  name: string;
  targetAudience: string;
  template: {
    title: string;
    body: string;
    route: string;
  };
  scheduledTime: string; // ISO string for datetime-local input
  status: string;
}

const DEFAULT_CAMPAIGN: Campaign = {
  id: "",
  name: "",
  targetAudience: "all_users",
  template: {
    title: "",
    body: "",
    route: "/(tabs)/learn"
  },
  scheduledTime: "",
  status: "pending"
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "system/push_config/campaigns");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Campaign));
      // sort by scheduled time descending
      data.sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    const fetchTemplates = async () => {
      try {
        const snap = await getDocs(collection(db, "system/push_config/templates"));
        setTemplates(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };
    fetchTemplates();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign || !editingCampaign.id) return;
    
    try {
      const docRef = doc(db, "system/push_config/campaigns", editingCampaign.id);
      await setDoc(docRef, editingCampaign);
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
      await deleteDoc(doc(db, "system/push_config/campaigns", id));
      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("Failed to delete campaign.");
    }
  };

  const openModal = (campaign?: Campaign) => {
    if (campaign) {
      setEditingCampaign(JSON.parse(JSON.stringify(campaign)));
    } else {
      // Set default time to now + 30 mins
      const defaultTime = new Date(Date.now() + 30 * 60000);
      
      setEditingCampaign(JSON.parse(JSON.stringify({ 
        ...DEFAULT_CAMPAIGN, 
        id: `camp_${Date.now()}`,
        scheduledTime: defaultTime.toISOString()
      })));
    }
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#f59e0b"; // orange
      case "processing": return "#3b82f6"; // blue
      case "completed": return "#10b981"; // green
      case "failed": return "#ef4444"; // red
      default: return "#6b7280"; // gray
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Chiến dịch Custom Push</h1>
        <button 
          onClick={() => openModal()}
          style={{ padding: "10px 16px", background: "#C442F0", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          🚀 Lên lịch chiến dịch mới
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
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Giờ gửi (Local)</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Đối tượng</th>
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
                      <div style={{ fontSize: "12px", color: "#a1a1aa", marginTop: "4px" }}>{camp.template.title}</div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      {new Date(camp.scheduledTime).toLocaleString()}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 8px", background: "#3f3f46", borderRadius: "4px", fontSize: "12px" }}>
                        {camp.targetAudience}
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
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: "#252239", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
              {editingCampaign.id.startsWith("camp_") && editingCampaign.name === "" ? "Lên lịch Chiến dịch" : "Sửa Chiến dịch"}
            </h2>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tên chiến dịch (Nội bộ)</label>
                <input required value={editingCampaign.name} onChange={e => setEditingCampaign({...editingCampaign, name: e.target.value})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="VD: Khuyến mãi Black Friday" />
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Hẹn giờ bắn</label>
                  <input type="datetime-local" required value={editingCampaign.scheduledTime ? new Date(new Date(editingCampaign.scheduledTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,16) : ""} onChange={e => {
                    if (e.target.value) {
                      setEditingCampaign({...editingCampaign, scheduledTime: new Date(e.target.value).toISOString()});
                    }
                  }} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Đối tượng (Target)</label>
                  <select value={editingCampaign.targetAudience} onChange={e => setEditingCampaign({...editingCampaign, targetAudience: e.target.value})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                    <option value="all_users">Tất cả người dùng (All)</option>
                    <option value="inactive_3_days">Chưa học 3 ngày (Inactive)</option>
                    <option value="premium_only">Chỉ tài khoản Premium</option>
                  </select>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #403d5c", margin: "8px 0" }}></div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0" }}>Nội dung Push</h3>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Chọn từ Template có sẵn (Tùy chọn)</label>
                <select 
                  onChange={e => {
                    const selected = templates.find(t => t.id === e.target.value);
                    if (selected && editingCampaign) {
                      setEditingCampaign({
                        ...editingCampaign, 
                        template: {
                          ...editingCampaign.template,
                          title: selected.locales?.vi?.title || selected.locales?.en?.title || "",
                          body: selected.locales?.vi?.body || selected.locales?.en?.body || "",
                        }
                      });
                    }
                  }}
                  style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff", marginBottom: "16px" }}
                >
                  <option value="">-- Tự nhập tay bên dưới --</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.locales?.vi?.title || t.locales?.en?.title || t.id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tiêu đề</label>
                <input required value={editingCampaign.template.title} onChange={e => setEditingCampaign({...editingCampaign, template: {...editingCampaign.template, title: e.target.value}})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="Giảm giá 50% hôm nay! 🎉" />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nội dung chính</label>
                <textarea required value={editingCampaign.template.body} onChange={e => setEditingCampaign({...editingCampaign, template: {...editingCampaign.template, body: e.target.value}})} rows={3} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="Chỉ còn 3 tiếng nữa để nhận ưu đãi. Mở app ngay!" />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Đường dẫn khi ấn vào (Route)</label>
                <input required value={editingCampaign.template.route} onChange={e => setEditingCampaign({...editingCampaign, template: {...editingCampaign.template, route: e.target.value}})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="/(tabs)/shop" />
              </div>
              
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #403d5c", color: "#fff", borderRadius: "8px", cursor: "pointer" }}>Hủy</button>
                <button type="submit" style={{ padding: "10px 20px", background: "#C442F0", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Lưu Chiến Dịch</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
