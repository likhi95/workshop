import React, { useEffect, useState } from 'react'
import AiModal from '../Layout/Modal';
import { useNavigate } from 'react-router-dom';
import StudyService from '../../services/StudyService';

export default function StudyPlanList() {
    const [isAddOpen, setAddOpen]: any = useState(false);
    const [subjects, setSubjects]: any = useState([])
    const [filteredSubjects,setFilteredSubject] = useState(subjects)
    const [formdata, setFormData] = React.useState({
        subjectName: ""
    })
    const [isEditMode, setEditMode] = React.useState(false)
    const [editSubjectData, setEditSubjectData]: any = useState({
        subjectId: '',
        subjectName: ''
    })
    const navigate = useNavigate();
    // const service = new StudyService();

    useEffect(() => {
        fetchSubject()
    },[])

    
    const fetchSubject = async () => {
        try {
            const response = await fetch("http://192.168.1.89:8080/api/subjects");
            const data = await response.json();
            console.log(data)
            if (response.status === 200) {
                setSubjects(data)
                setFilteredSubject(data)
                
            } else {
                console.log("Failed to fetch subjects")
            }
        } catch (error) {
            console.log("Error fetching subjects:", error);
        }
    }

    const onSubject = (event: any) => {
        setFormData({ subjectName: event.target.value })
        setEditSubjectData((prevData:any)=>({
            ...prevData,
            subject:event.target.value
        }))
    }

    const addSubject = async (event: any) => {
        event.preventDefault()
        setAddOpen(false)

        try {
            const response = await fetch("http://192.168.1.89:8080/api/subjects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            })
            console.log(response)
            fetchSubject()
        } catch (err) {
            console.log("Failed to add subject:", err)
        }
    }

    const deleteSubject = async (subject: any) => {
        try {
            const response = await fetch(`http://192.168.1.89:8080/api/subjects/${subject.subjectId}/deleteSubject`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            fetchSubject()
            if (response.status === 200) {
                console.log("Subject Deleted")
            } else {
                console.log("Failed to delete")
            }

        } catch (err) {
            console.log("Failed to delete:", err)
        }
    }
    console.log(editSubjectData.id)
    const editSubjectContent = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/studyplan/subject/${editSubjectData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(editSubjectData)
            })
            fetchSubject()
            if (response.status === 201) {
                setAddOpen(false)
                console.log("Subject edit successful")
            } else {
                console.log("Failed to edit subject")
            }

        } catch (err) {
            console.log("Failed to edit:", err)
        }
    }

    const editSubject = (subject: any) => {
        setEditMode(true)
        setAddOpen(true)
        setEditSubjectData({
            id: subject._id,
            subject: subject.subject
        })
    }
    // const editSubjectContent = ()=>{}

    const filterSubjects = (event:any)=>{
        const filterValue = event.target.value.toLowerCase();
        const filtered = subjects.filter((each:any)=>{
            return each.subjectName.toLowerCase().includes(filterValue)
        })
        setFilteredSubject(filtered)
    }

    return (
        <div className="plan-list">
            <AiModal title={isEditMode ? "Edit Subject" : "Add Subject"} isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
                <form className="user-form" onSubmit={isEditMode ? editSubjectContent : addSubject}>
                    <div className="form-group">
                        <label htmlFor="subject">Subject Name:</label>
                        <input type="text" id="subject" name="subject" placeholder="Enter your subject" required onChange={onSubject} value={isEditMode ? editSubjectData.subject : formdata.subjectName} />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>

            </AiModal>
            <div className="module-header glass-structure">
                <h3>Subjects</h3>
                <div className="module-actions">
                    <input type="text" placeholder="Search..." className="module-search-input" onChange={filterSubjects} />
                    <button className="module-add-btn" onClick={() => setAddOpen(!isAddOpen)}>Add</button>
                </div>
            </div>
            <div className="table-container glass-table-structure">
                <table className="table-stripped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Chapters</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredSubjects.map((subject: any) => (
                                <tr key={subject.subjectId}>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.chapters.length ?? 0}</td>
                                    <td>
                                        <button className="table-action-btn table-view-btn" onClick={() => navigate('/admin/study-plan/' + subject.subjectId)}>View</button>
                                        <button className="table-action-btn table-edit-btn" onClick={() => editSubject(subject)}>Edit</button>
                                        <button className="table-action-btn table-delete-btn" onClick={() => deleteSubject(subject)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
}
