"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

interface PushTemplate {
  id: string;
  group: string;
  weight: number;
  isActive: boolean;
  locales: {
    vi: { title: string; body: string };
    en: { title: string; body: string };
  };
}

const DEFAULT_TEMPLATE: PushTemplate = {
  id: "",
  group: "mascot",
  weight: 1,
  isActive: true,
  locales: {
    vi: { title: "", body: "" },
    en: { title: "", body: "" }
  }
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<PushTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<PushTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "system/push_config/templates");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PushTemplate));
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate || !editingTemplate.id) return;
    
    try {
      const docRef = doc(db, "system/push_config/templates", editingTemplate.id);
      // Remove id from the document body itself to avoid duplication if desired, or keep it.
      await setDoc(docRef, editingTemplate);
      setIsModalOpen(false);
      fetchTemplates();
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa template này?")) return;
    try {
      await deleteDoc(doc(db, "system/push_config/templates", id));
      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Failed to delete template.");
    }
  };

  const openModal = (template?: PushTemplate) => {
    if (template) {
      setEditingTemplate(JSON.parse(JSON.stringify(template))); // deep copy
    } else {
      setEditingTemplate(JSON.parse(JSON.stringify({ ...DEFAULT_TEMPLATE, id: `tpl_${Date.now()}` })));
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Quản lý Push Templates</h1>
        <button 
          onClick={() => openModal()}
          style={{ padding: "10px 16px", background: "#C442F0", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          + Thêm Template
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ background: "#252239", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#1e1c31", borderBottom: "1px solid #403d5c" }}>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>ID</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Group</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Tiêu đề (VI)</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Trạng thái</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {templates.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "16px", textAlign: "center", color: "#a1a1aa" }}>Chưa có template nào.</td>
                </tr>
              ) : (
                templates.map((tpl) => (
                  <tr key={tpl.id} style={{ borderBottom: "1px solid #403d5c" }}>
                    <td style={{ padding: "16px" }}>{tpl.id}</td>
                    <td style={{ padding: "16px" }}><span style={{ padding: "4px 8px", background: "#3f3f46", borderRadius: "4px", fontSize: "12px" }}>{tpl.group}</span></td>
                    <td style={{ padding: "16px" }}>{tpl.locales?.vi?.title || "N/A"}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ color: tpl.isActive ? "#4ade80" : "#f87171" }}>
                        {tpl.isActive ? "Đang bật" : "Đã tắt"}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button onClick={() => openModal(tpl)} style={{ marginRight: "12px", background: "transparent", border: "none", color: "#60a5fa", cursor: "pointer" }}>Sửa</button>
                      <button onClick={() => handleDelete(tpl.id)} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}>Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingTemplate && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: "#252239", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "24px" }}>
              {editingTemplate.id.startsWith("tpl_") ? "Thêm Template Mới" : "Sửa Template"}
            </h2>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>ID</label>
                  <input required value={editingTemplate.id} onChange={e => setEditingTemplate({...editingTemplate, id: e.target.value})} disabled={!editingTemplate.id.startsWith("tpl_")} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nhóm (Group)</label>
                  <select value={editingTemplate.group} onChange={e => setEditingTemplate({...editingTemplate, group: e.target.value})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }}>
                    <option value="mascot">mascot</option>
                    <option value="urgency">urgency</option>
                    <option value="social">social</option>
                    <option value="freeze">freeze</option>
                    <option value="comeback">comeback</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tiêu đề (Tiếng Việt)</label>
                <input required value={editingTemplate.locales?.vi?.title || ""} onChange={e => setEditingTemplate({...editingTemplate, locales: {...editingTemplate.locales, vi: {...editingTemplate.locales.vi, title: e.target.value}}})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nội dung (Tiếng Việt) - Hỗ trợ {'{N}'} (streak), {'{name}'}</label>
                <textarea required value={editingTemplate.locales?.vi?.body || ""} onChange={e => setEditingTemplate({...editingTemplate, locales: {...editingTemplate.locales, vi: {...editingTemplate.locales.vi, body: e.target.value}}})} rows={3} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
              </div>

              <div style={{ borderTop: "1px solid #403d5c", margin: "8px 0" }}></div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tiêu đề (Tiếng Anh)</label>
                <input required value={editingTemplate.locales?.en?.title || ""} onChange={e => setEditingTemplate({...editingTemplate, locales: {...editingTemplate.locales, en: {...editingTemplate.locales.en, title: e.target.value}}})} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Nội dung (Tiếng Anh)</label>
                <textarea required value={editingTemplate.locales?.en?.body || ""} onChange={e => setEditingTemplate({...editingTemplate, locales: {...editingTemplate.locales, en: {...editingTemplate.locales.en, body: e.target.value}}})} rows={3} style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
              </div>
              
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={editingTemplate.isActive} onChange={e => setEditingTemplate({...editingTemplate, isActive: e.target.checked})} />
                  Đang hoạt động (Active)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <label style={{ fontSize: "14px", color: "#a1a1aa" }}>Weight (Tỷ lệ xuất hiện):</label>
                  <input type="number" min={1} max={10} required value={editingTemplate.weight} onChange={e => setEditingTemplate({...editingTemplate, weight: Number(e.target.value)})} style={{ width: "60px", padding: "6px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #403d5c", color: "#fff", borderRadius: "8px", cursor: "pointer" }}>Hủy</button>
                <button type="submit" style={{ padding: "10px 20px", background: "#C442F0", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
