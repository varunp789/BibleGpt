import React, { useState, useEffect } from "react";
import "./admin.css";
import { Button, Modal, Popconfirm } from "antd";

const AdminChat = () => {
  const [adminData, setAdminData] = useState([]);
  const [adding, setAdding] = useState(false);
  const [addPrompt, setAddPrompt] = useState("");
  const [addAnswer, setaddAnswer] = useState("");
  const [state, setState] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatedPrompt, setUpdatedPrompt] = useState("");
  const [updatedAnswer, setUpdatedAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, [state]);

  const fetchAdminData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/admin/all`);
      const resData = await res.json();
      console.log(resData);
      setAdminData(resData);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const addData = async () => {
    setAdding(true);
    const API = `${process.env.REACT_APP_URL}/admin/add`;
    const reqData = {
      method: "POST",
      body: JSON.stringify({
        question: addAnswer,
        answer: addPrompt,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(API, reqData);
      const responseAdminData = await response.text();
      console.log(responseAdminData);
      // Refresh the prompt list after adding
      fetchAdminData();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setAdding(false);
    setAddPrompt("");
    setaddAnswer("");
    setState(!state);
  };

  const deletePrompt = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/admin/${id}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        console.log("Prompt deleted successfully");
      } else {
        console.log("deleting...");
        setDeleting(false);
        setState(!state);
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
      setDeleting(false);
    }
  };
  const updatePrompt = async (id) => {
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          question: updatedPrompt,
          answer: updatedAnswer,
        }),
      });

      if (res.status === 200) {
        console.log("Prompt updated successfully");
        setUpdating(false);
        setState(!state);
      } else {
        console.log("Failed to update prompt");
        setUpdating(false);
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
      setUpdating(false);
      setUpdatedPrompt("");
      setUpdatedAnswer("");
      setState(!state);
    }
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="admin">
        <input
          type="text"
          className="admin-prompt"
          value={addPrompt}
          placeholder="Add your prompt"
          onChange={(e) => setAddPrompt(e.target.value)}
        />
        <br />
        <input
          type="text"
          className="admin-answer"
          value={addAnswer}
          placeholder="Add your answer"
          onChange={(e) => setaddAnswer(e.target.value)}
        />
        <Button
          type="primary"
          className="add-prompt"
          onClick={addData}
          disabled={adding}>
          {adding ? "Adding..." : "Add Prompt"}
        </Button>
      </div>
      <div>
        <table className="admin-table">
          <thead>
            <tr className="admin-tr">
              <th>Prompt</th>
              <th>Answer</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.prompt} </td>
                <td>{admin.answer}</td>
                <td>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deletePrompt(admin.id)}>
                    <Button danger disabled={deleting}>
                      {deleting ? "Updating.." : "Delete"}
                    </Button>
                  </Popconfirm>
                </td>
                <td>
                  <Button type="primary" onClick={showModal}>
                    Edit
                  </Button>
                  <Modal
                    title="Edit Prompt & Answer"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}>
                    <input
                      type="text"
                      className="update-prompt"
                      placeholder="New Prompt"
                      onChange={(e) => setUpdatedPrompt(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      className="update-answer"
                      placeholder="New Answer"
                      onChange={(e) => setUpdatedAnswer(e.target.value)}
                    />
                    <br />
                    <div className="update-btn">
                      <Button
                        type="primary"
                        onClick={() => updatePrompt(admin.id)}
                        disabled={updating}>
                        {updating ? "Updating..." : "Update"}
                      </Button>
                    </div>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminChat;
