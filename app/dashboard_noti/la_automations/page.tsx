"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

interface LACondition {
  field: string;
  operator: string;
  value?: string | number;
}

interface LAAutomation {
  id: string;
  name: string;
  status: string;
  targetAudience: string;
  testUserId?: string;
  schedule: {
    type: string;
    hour: number;
  };
  conditions: LACondition[];
  template: {
    uiType: string;
    attributes: {
      lessonName: string;
      mascotVariant: string;
    };
    contentState: {
      titleMessage?: string;
      statusMessage: string;
      progress: number;
      streakCount: number;
      hoursInactive?: number;
      themeColor?: string;
      deadlineHoursOffset?: number | null;
    };
    alertTitle: string;
    alertBody: string;
  };
}

const DEFAULT_AUTOMATION: LAAutomation = {
  id: "",
  name: "",
  status: "active",
  targetAudience: "test_user",
  testUserId: "",
  schedule: {
    type: "daily_local_time",
    hour: 20
  },
  conditions: [
    { field: "behavior", operator: "not_learned_today" }
  ],
  template: {
    uiType: "streak_risk_critical",
    attributes: {
      lessonName: "Pianify Streak",
      mascotVariant: "ios_widget_danger_crying_hard"
    },
    contentState: {
      statusMessage: "🔥 Đừng để mất chuỗi Streak!",
      progress: 0.0,
      streakCount: 0,
      hoursInactive: 0,
      themeColor: "dark",
      deadlineHoursOffset: 4
    },
    alertTitle: "Streak at Risk! 🔥",
    alertBody: "Bạn chưa học hôm nay!"
  }
};

export default function LiveActivityAutomationsPage() {
  const [automations, setAutomations] = useState<LAAutomation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAuto, setEditingAuto] = useState<LAAutomation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAutomations = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "system/push_config/la_automations");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map(doc => {
        const docData = doc.data();
        return { 
          id: doc.id, 
          ...docData,
          targetAudience: docData.targetAudience || "all_users",
          testUserId: docData.testUserId || ""
        } as LAAutomation;
      });
      setAutomations(data);
    } catch (error) {
      console.error("Error fetching automations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAuto || !editingAuto.id) return;
    
    try {
      const docRef = doc(db, "system/push_config/la_automations", editingAuto.id);
      await setDoc(docRef, editingAuto);
      setIsModalOpen(false);
      fetchAutomations();
    } catch (error) {
      console.error("Error saving automation:", error);
      alert("Failed to save automation.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa luật này?")) return;
    try {
      await deleteDoc(doc(db, "system/push_config/la_automations", id));
      fetchAutomations();
    } catch (error) {
      console.error("Error deleting automation:", error);
      alert("Failed to delete automation.");
    }
  };

  const openModal = (auto?: LAAutomation) => {
    if (auto) {
      setEditingAuto(JSON.parse(JSON.stringify(auto)));
    } else {
      setEditingAuto(JSON.parse(JSON.stringify({ 
        ...DEFAULT_AUTOMATION, 
        id: `auto_${Date.now()}`
      })));
    }
    setIsModalOpen(true);
  };

  const toggleStatus = async (auto: LAAutomation) => {
    const newStatus = auto.status === "active" ? "paused" : "active";
    const docRef = doc(db, "system/push_config/la_automations", auto.id);
    await setDoc(docRef, { ...auto, status: newStatus });
    fetchAutomations();
  };

  const updateCondition = (index: number, key: string, value: any) => {
    if (!editingAuto) return;
    const newConds = [...editingAuto.conditions];
    newConds[index] = { ...newConds[index], [key]: value };
    setEditingAuto({ ...editingAuto, conditions: newConds });
  };

  const addCondition = () => {
    if (!editingAuto) return;
    setEditingAuto({
      ...editingAuto,
      conditions: [...editingAuto.conditions, { field: "streakCount", operator: ">=", value: 3 }]
    });
  };

  const removeCondition = (index: number) => {
    if (!editingAuto) return;
    const newConds = [...editingAuto.conditions];
    newConds.splice(index, 1);
    setEditingAuto({ ...editingAuto, conditions: newConds });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Tự động hoá Live Activity (Cronjobs)</h1>
        <button 
          onClick={() => openModal()}
          style={{ padding: "10px 16px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          ⚡ Tạo luật mới (Automation)
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ background: "#252239", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#1e1c31", borderBottom: "1px solid #403d5c" }}>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Tên Automation</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Giờ chạy (Local)</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Giao diện</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Trạng thái</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {automations.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "16px", textAlign: "center", color: "#a1a1aa" }}>Chưa có automation nào.</td>
                </tr>
              ) : (
                automations.map((auto) => (
                  <tr key={auto.id} style={{ borderBottom: "1px solid #403d5c" }}>
                    <td style={{ padding: "16px" }}>
                      <strong>{auto.name}</strong>
                      <div style={{ fontSize: "12px", color: "#a1a1aa", marginTop: "4px" }}>Alert: {auto.template.alertTitle}</div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      Hàng ngày lúc {auto.schedule.hour}:00
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 8px", background: "#3f3f46", borderRadius: "4px", fontSize: "12px" }}>
                        {auto.template.uiType}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button 
                        onClick={() => toggleStatus(auto)}
                        style={{ 
                          padding: "4px 8px", 
                          background: auto.status === "active" ? "#10b98120" : "#6b728020", 
                          color: auto.status === "active" ? "#10b981" : "#a1a1aa",
                          border: `1px solid ${auto.status === "active" ? "#10b98140" : "#6b728040"}`,
                          borderRadius: "4px", 
                          fontSize: "12px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          textTransform: "uppercase"
                        }}>
                        {auto.status}
                      </button>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button 
                        onClick={() => openModal(auto)} 
                        style={{ marginRight: "12px", background: "transparent", border: "none", color: "#60a5fa", cursor: "pointer" }}
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={() => handleDelete(auto.id)} 
                        style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}
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
      {isModalOpen && editingAuto && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "20px" }}>
          <div style={{ background: "#252239", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "900px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
              {editingAuto.id.startsWith("auto_") && editingAuto.name === "" ? "Tạo luật Automation mới" : "Sửa Automation"}
            </h2>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* BLOCK 1: SCHEDULING */}
              <div style={{ background: "#1e1c31", padding: "16px", borderRadius: "8px", border: "1px solid #403d5c" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0", marginBottom: "16px" }}>1. Lịch chạy (Schedule)</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tên Automation (Nội bộ)</label>
                    <input required value={editingAuto.name} onChange={e => setEditingAuto({...editingAuto, name: e.target.value})} style={{ width: "100%", padding: "10px", background: "#252239", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="VD: Nhắc học lúc 20h" />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Loại lịch chạy</label>
                    <select value={editingAuto.schedule.type} onChange={e => setEditingAuto({...editingAuto, schedule: { ...editingAuto.schedule, type: e.target.value }})} style={{ width: "100%", padding: "10px", background: "#252239", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                      <option value="daily_local_time">Chạy hàng ngày theo giờ địa phương</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Giờ chạy (0 - 23)</label>
                    <input type="number" min="0" max="23" required value={editingAuto.schedule.hour} onChange={e => setEditingAuto({...editingAuto, schedule: { ...editingAuto.schedule, hour: parseInt(e.target.value) }})} style={{ width: "100%", padding: "10px", background: "#252239", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                  </div>

                  <div style={{ gridColumn: "1 / -1", marginTop: "8px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Đối tượng (Target)</label>
                    <select value={editingAuto.targetAudience} onChange={e => setEditingAuto({...editingAuto, targetAudience: e.target.value})} style={{ width: "100%", padding: "10px", background: "#252239", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                      <option value="test_user">Chỉ 1 người (Test User)</option>
                      <option value="all_users">Tất cả người dùng (All)</option>
                    </select>
                  </div>

                  {editingAuto.targetAudience === "test_user" && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nhập UID của người nhận (Bắt buộc cho Test User)</label>
                      <input required value={editingAuto.testUserId || ""} onChange={e => setEditingAuto({...editingAuto, testUserId: e.target.value})} style={{ width: "100%", padding: "10px", background: "#252239", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} placeholder="VD: yfkXQjR6nwv2ZlV4igvC" />
                    </div>
                  )}
                </div>
              </div>

              {/* BLOCK 2: CONDITIONS */}
              <div style={{ background: "#1e1c31", padding: "16px", borderRadius: "8px", border: "1px solid #403d5c" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0" }}>2. Điều kiện nhận (Logic Filters)</h3>
                  <button type="button" onClick={addCondition} style={{ padding: "6px 12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>+ Thêm điều kiện</button>
                </div>
                
                {editingAuto.conditions.map((cond, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center", background: "#252239", padding: "12px", borderRadius: "8px" }}>
                    <select value={cond.field} onChange={e => updateCondition(idx, "field", e.target.value)} style={{ flex: 1, padding: "8px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }}>
                      <option value="behavior">Hành vi học (behavior)</option>
                      <option value="streakCount">Số ngày Streak (streakCount)</option>
                    </select>

                    <select value={cond.operator} onChange={e => updateCondition(idx, "operator", e.target.value)} style={{ flex: 1, padding: "8px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }}>
                      {cond.field === "behavior" ? (
                        <>
                          <option value="not_learned_today">Chưa học hôm nay</option>
                          <option value="learned_today">Đã học hôm nay</option>
                        </>
                      ) : (
                        <>
                          <option value="==">Bằng (==)</option>
                          <option value=">=">Lớn hơn hoặc bằng (&gt;=)</option>
                          <option value="<=">Nhỏ hơn hoặc bằng (&lt;=)</option>
                        </>
                      )}
                    </select>

                    {cond.field !== "behavior" && (
                      <input type="number" value={cond.value as number} onChange={e => updateCondition(idx, "value", parseInt(e.target.value))} style={{ flex: 1, padding: "8px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                    )}

                    <button type="button" onClick={() => removeCondition(idx)} style={{ padding: "8px", background: "#f8717120", color: "#f87171", border: "none", borderRadius: "4px", cursor: "pointer" }}>Xóa</button>
                  </div>
                ))}
                {editingAuto.conditions.length === 0 && (
                  <p style={{ color: "#a1a1aa", fontSize: "14px", fontStyle: "italic" }}>Không có điều kiện nào. Tất cả user đến giờ sẽ nhận được (Không khuyến khích).</p>
                )}
              </div>

              {/* BLOCK 3: TEMPLATE */}
              <div style={{ background: "#1e1c31", padding: "16px", borderRadius: "8px", border: "1px solid #403d5c" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#e2e8f0", marginBottom: "16px" }}>3. Giao diện (Template)</h3>
                
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Loại Giao diện (UI Type)</label>
                  <select value={editingAuto.template.uiType} onChange={e => setEditingAuto({
                    ...editingAuto, template: { ...editingAuto.template, uiType: e.target.value }
                  })} style={{ width: "100%", padding: "10px", background: "#252239", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                    <option value="streak_risk_critical">Khẩn cấp đứt Streak (streak_risk_critical)</option>
                    <option value="retention">Tương tác hàng ngày (retention)</option>
                    <option value="onboarding">Chào đón (onboarding)</option>
                    <option value="menu">Mặc định (menu)</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Lesson Name (Góc trên)</label>
                    <input required value={editingAuto.template.attributes.lessonName} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, attributes: { ...editingAuto.template.attributes, lessonName: e.target.value } }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Mascot Variant</label>
                    <select value={editingAuto.template.attributes.mascotVariant} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, attributes: { ...editingAuto.template.attributes, mascotVariant: e.target.value } }
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

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Status Message (Mô tả ngắn)</label>
                    <input required value={editingAuto.template.contentState.statusMessage} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, contentState: { ...editingAuto.template.contentState, statusMessage: e.target.value } }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Tiến trình Progress (Cố định, vd: 0.0)</label>
                    <input type="number" step="0.01" min="0" max="1" required value={editingAuto.template.contentState.progress} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, contentState: { ...editingAuto.template.contentState, progress: parseFloat(e.target.value) } }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Đồng hồ đếm ngược (Cộng thêm X giờ nữa)</label>
                    <input type="number" value={editingAuto.template.contentState.deadlineHoursOffset || 0} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, contentState: { ...editingAuto.template.contentState, deadlineHoursOffset: parseInt(e.target.value) || null } }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} placeholder="VD: 4 (Nghĩa là 4 tiếng nữa hết hạn)" />
                  </div>

                  {editingAuto.template.uiType === "retention" && (
                    <div>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Hours Inactive (Xanh=6, Vàng=8, Đỏ=10)</label>
                      <input type="number" value={editingAuto.template.contentState.hoursInactive || 0} onChange={e => setEditingAuto({
                        ...editingAuto, template: { ...editingAuto.template, contentState: { ...editingAuto.template.contentState, hoursInactive: parseInt(e.target.value, 10) } }
                      })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                    </div>
                  )}

                  {editingAuto.template.uiType === "onboarding" && (
                    <>
                      <div>
                        <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Title Message</label>
                        <input value={editingAuto.template.contentState.titleMessage || ""} onChange={e => setEditingAuto({
                          ...editingAuto, template: { ...editingAuto.template, contentState: { ...editingAuto.template.contentState, titleMessage: e.target.value } }
                        })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Theme Color</label>
                        <select value={editingAuto.template.contentState.themeColor || "pink"} onChange={e => setEditingAuto({
                          ...editingAuto, template: { ...editingAuto.template, contentState: { ...editingAuto.template.contentState, themeColor: e.target.value } }
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

                <div style={{ borderTop: "1px solid #403d5c", margin: "16px 0" }}></div>
                <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#a1a1aa", marginBottom: "12px" }}>Thông báo nổi (Push Alert)</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Tiêu đề (Title)</label>
                    <input required value={editingAuto.template.alertTitle} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, alertTitle: e.target.value }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "#a1a1aa" }}>Nội dung (Body)</label>
                    <input required value={editingAuto.template.alertBody} onChange={e => setEditingAuto({
                      ...editingAuto, template: { ...editingAuto.template, alertBody: e.target.value }
                    })} style={{ width: "100%", padding: "8px", background: "#252239", border: "1px solid #403d5c", borderRadius: "6px", color: "#fff" }} />
                  </div>
                </div>

              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #403d5c", color: "#fff", borderRadius: "8px", cursor: "pointer" }}>Hủy</button>
                <button type="submit" style={{ padding: "10px 20px", background: "#8b5cf6", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Lưu Automation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
