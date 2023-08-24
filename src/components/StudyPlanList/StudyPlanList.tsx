import React, { useEffect, useState } from 'react'
import AiModal from '../Layout/Modal';
import { useNavigate } from 'react-router-dom';


export default function StudyPlanList() {
    const [isAddOpen, setAddOpen]: any = useState(false);
    const [subjects, setSubjects]: any = useState([])

    const [formdata, setFormData] = React.useState({
        subjectName: ""
    })
    const [isEditMode, setEditMode] = React.useState(false)
    const [editSubjectData, setEditSubjectData]: any = useState({
        subjectId: '',
        subjectName: ''
    })
    const navigate = useNavigate();
 
    const onSubject = (event: any) => {
        setFormData({ subjectName: event.target.value })
        setEditSubjectData((prevData:any)=>({
            ...prevData,
            subject:event.target.value
        }))
    }

    const editSubject = (subject: any) => {
        setEditMode(true)
        setAddOpen(true)
        setEditSubjectData({
            id: subject._id,
            subject: subject.subject
        })
    }


    return (
        <div className="plan-list">
            <AiModal title={isEditMode ? "Edit Subject" : "Add Subject"} isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
                <form className="user-form">
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
                    <input type="text" placeholder="Search..." className="module-search-input"  />
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
                            subjects.map((subject: any) => (
                                <tr key={subject.subjectId}>
                                    <td>{subject.subjectName}</td>
                                    <td>{subject.chapters.length ?? 0}</td>
                                    <td>
                                        <button className="table-action-btn table-view-btn" onClick={() => navigate('/admin/study-plan/' + subject.subjectId)}>View</button>
                                        <button className="table-action-btn table-edit-btn" onClick={() => editSubject(subject)}>Edit</button>
                                        <button className="table-action-btn table-delete-btn">Delete</button>
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
