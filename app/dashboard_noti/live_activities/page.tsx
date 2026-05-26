"use client";

import { useState, useEffect } from "react";
import { db, app } from "@/lib/firebase";
import { collectionGroup, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

interface LiveActivity {
  id: string; // The doc ID (activityId)
  uid: string; // The user ID
  activityId: string;
  pushToken: string;
  scenario: string;
  status: string;
  registeredAt: any;
  expiresAt: number;
}

export default function LiveActivitiesPage() {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUid, setSearchUid] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      // Query all live activities across all users
      const q = query(collectionGroup(db, "liveActivities"), where("status", "==", "active"));
      const snapshot = await getDocs(q);
      
      const data = snapshot.docs.map(docSnap => {
        // Doc path is usually: users/{uid}/liveActivities/{activityId}
        const uid = docSnap.ref.parent.parent?.id || "unknown";
        return {
          id: docSnap.id,
          uid,
          ...docSnap.data()
        } as LiveActivity;
      });
      
      // Sort by expiresAt
      data.sort((a, b) => a.expiresAt - b.expiresAt);
      setActivities(data);
    } catch (error) {
      console.error("Error fetching live activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleForceKill = async (uid: string, activityId: string) => {
    if (!confirm(`Bạn có chắc chắn muốn Force Kill Live Activity này của user ${uid}?`)) return;
    
    try {
      const docRef = doc(db, "users", uid, "liveActivities", activityId);
      await updateDoc(docRef, { status: "ended" });
      alert("Đã buộc kết thúc thành công!");
      fetchActivities();
    } catch (error) {
      console.error("Error force killing activity:", error);
      alert("Lỗi khi kết thúc activity.");
    }
  };

  const handleWakeUp = async (uid: string) => {
    if (!uid) {
      alert("Vui lòng nhập UID!");
      return;
    }
    
    setIsSending(true);
    try {
      const functions = getFunctions(app, "asia-southeast1");
      const sendWakeUp = httpsCallable(functions, "dev_admin_live_activity_action");
      await sendWakeUp({ action: "wakeup", targetUid: uid });
      alert(`Đã gửi Silent Push (Wake Up) tới user ${uid}!`);
    } catch (error: any) {
      console.error("Error waking up:", error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleManualUpdate = async (uid: string, scenario: string) => {
    setIsSending(true);
    try {
      const functions = getFunctions(app, "asia-southeast1");
      const sendUpdate = httpsCallable(functions, "dev_admin_live_activity_action");
      await sendUpdate({ action: "update", targetUid: uid, scenario });
      alert(`Đã đẩy data update test tới Live Activity của user ${uid}!`);
    } catch (error: any) {
      console.error("Error manual update:", error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const filteredActivities = searchUid 
    ? activities.filter(a => a.uid.includes(searchUid))
    : activities;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>⚡ Live Activities (iOS)</h1>
        <button 
          onClick={fetchActivities}
          style={{ padding: "10px 16px", background: "#403d5c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          🔄 Refresh
        </button>
      </div>

      <div style={{ background: "#252239", padding: "20px", borderRadius: "12px", marginBottom: "24px", display: "flex", gap: "16px", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#a1a1aa" }}>Tìm UID / Hoặc nhập UID để Wake Up test</label>
          <input 
            value={searchUid} 
            onChange={e => setSearchUid(e.target.value)} 
            style={{ width: "100%", padding: "10px", background: "#1e1c31", border: "1px solid #403d5c", borderRadius: "8px", color: "#fff" }} 
            placeholder="VD: yfkXQjR6nwv2ZlV4igvC" 
          />
        </div>
        <button 
          onClick={() => handleWakeUp(searchUid)}
          disabled={isSending || !searchUid}
          style={{ padding: "10px 20px", background: "#3b82f6", border: "none", color: "#fff", borderRadius: "8px", cursor: searchUid ? "pointer" : "not-allowed", fontWeight: "bold", opacity: searchUid ? 1 : 0.5 }}
        >
          🔔 Wake Up (Silent Push)
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ background: "#252239", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#1e1c31", borderBottom: "1px solid #403d5c" }}>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>User UID</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Kịch bản (Scenario)</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Trạng thái</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Hết hạn (Expires)</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "#a1a1aa" }}>Thao tác Admin</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "16px", textAlign: "center", color: "#a1a1aa" }}>Không có Live Activity nào đang chạy.</td>
                </tr>
              ) : (
                filteredActivities.map((act) => (
                  <tr key={act.id} style={{ borderBottom: "1px solid #403d5c" }}>
                    <td style={{ padding: "16px", fontFamily: "monospace", color: "#60a5fa" }}>
                      {act.uid}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "4px 8px", background: "#3f3f46", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                        {act.scenario}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ 
                        padding: "4px 8px", 
                        background: act.status === "active" ? "#10b98120" : "#ef444420", 
                        color: act.status === "active" ? "#10b981" : "#ef4444",
                        border: `1px solid ${act.status === "active" ? "#10b98140" : "#ef444440"}`,
                        borderRadius: "4px", 
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "uppercase"
                      }}>
                        {act.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px" }}>
                      {new Date(act.expiresAt).toLocaleString()}
                    </td>
                    <td style={{ padding: "16px", display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => handleManualUpdate(act.uid, act.scenario)} 
                        disabled={isSending}
                        style={{ padding: "6px 12px", background: "#f59e0b", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                      >
                        Push Update
                      </button>
                      <button 
                        onClick={() => handleForceKill(act.uid, act.id)} 
                        style={{ padding: "6px 12px", background: "#ef4444", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                      >
                        Force Kill
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
