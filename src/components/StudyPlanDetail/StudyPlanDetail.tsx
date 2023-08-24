import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AiModal from '../Layout/Modal';

export default function StudyPlanDetail() {
    const [isAddOpen, setAddOpen]: any = useState(false);
    const params: any = useParams();
    const [subject, setSubject]: any = useState();
    const [isEditMode, setIsEditMode] = useState(false);
    const [filteredChapters, setFilteredChapters] = useState(subject)
    console.log(subject)
    const [formData, setFormData]: any = React.useState([{
        chapterTitle: '',
        chapterDescription: ''
    }])
    const [editableChapter, setEditableChapter]: any = useState({
        chapterId: '',
        chapterTitle: '',
        chapterDescription: '',
    });

    // const service = new StudyService();

    useEffect(() => {
        getSingleSubject();
    }, [])



    const getSingleSubject = async () => {
        const response = await fetch(`http://192.168.1.89:8080/api/subjects/${params.id}/subject`)
        const data = await response.json()
        setSubject(data)
        setFilteredChapters(data)
        if (response.status === 200) {
            console.log("Subject fetched successfully")
        } else {
            console.log("Failed to fetch the subject")
        }
    }

    

    const onChapter = (event: any) => {
        {
            isEditMode ? setEditableChapter((prevData: any) => ({
                ...prevData,
                chapterTitle: event.target.value
            })) : setFormData((prevData: any) => ({
                ...prevData,
                chapterTitle: event.target.value
            }))
        }
    }

    const onDescription = (event: any) => {
        {
            isEditMode ? setEditableChapter((prevData: any) => ({
                ...prevData,
                chapterDescription: event.target.value
            })) : setFormData((prevData: any) => ({
                ...prevData,
                chapterDescription: event.target.value
            }))
        }
    }


    const addChapter = async (event: any) => {
        event.preventDefault()
        try {
            const response = await fetch(`http://192.168.1.89:8080/api/chapters/${params.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            getSingleSubject()
            if (response.status === 201) {
                setAddOpen(false)
                console.log("Chapter added successfully")
            } else {
                console.log("Failed to add chapter")
            }
        } catch (err) {
            console.log("Failed to add chapter:", err)
        }
    }

    const handleEditClick = (chapter: any) => {
        setIsEditMode(true);
        setEditableChapter({
            chapterId: chapter.chapterId,
            chapterTitle: chapter.chapterTitle,
            chapterDescription: chapter.chapterDescription
        });
        setAddOpen(true);
    };

    const handleDeleteClick = async (chapter: any) => {
        try {
            const response = await fetch(`http://192.168.1.89:8080/api/chapters/${chapter.chapterId}/deleteChapter`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            getSingleSubject()
            if (response.status === 200) {
                console.log("Chapter Deleted")
            } else {
                console.log("Failed to delete")
            }
        } catch (err) {
            console.log("Failed to delete:", err)
        }

    }

    // console.log(editableChapter.id)

    const updateChapter = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://192.168.1.89:8080/api/chapters/${editableChapter.chapterId}/updateChapter`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editableChapter),
            });
            getSingleSubject()
            if (response.status === 201) {
                setAddOpen(false);
                setIsEditMode(false);
                console.log("Chapter updated successfully");
            } else {
                console.log("Failed to update chapter");
            }
        } catch (err) {
            console.log("Failed to update chapter:", err);
        }
    };


    // const filterChapter = (event: any) => {
    //     const filteredValue = event.target.value.toLowerCase()
    //     const filtered = subject.chapters.filter((chapter: any) => {
    //         return chapter.chapterTitle.toLowerCase().includes(filteredValue)
    //     })
    //     setFilteredChapters(filtered)
    // }




    return (
        <div>
            <AiModal title={isEditMode ? 'Edit Chapter' : 'Add Chapter'} isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
                <form className="user-form">
                    <div className="form-group">
                        <label htmlFor="chapter">Chpater Name:</label>
                        <input type="text" id="chapter" name="chapter" placeholder="Enter your chapter" required onChange={onChapter} value={isEditMode ? editableChapter.chapterTitle : formData.chapterTitle} />
                    </div>

                    <div className="input-container glass-structure">
                        <textarea placeholder="Enter your long text here..." onChange={onDescription} value={isEditMode ? editableChapter.chapterDescription : formData.chapterDescription}></textarea>
                    </div>

                    <button type="submit" className="submit-btn">{isEditMode ? 'Update' : 'Save'}</button>
                </form>
            </AiModal>
            <div className="module-header glass-structure">
                <h3>{subject && subject.title}</h3>
                <div className="module-actions">
                    <input type="text" placeholder="Search..." className="module-search-input"/>
                    <button className="module-add-btn" onClick={() => setAddOpen(!isAddOpen)}>Add</button>
                </div>
            </div>
            <div className="subject-list">
                {
                    subject && subject.chapters.map((chapter: any) => (
                        <div key={chapter.chapterId} className="subject-item glass-sub-structure">
                            <div className="chapter">{chapter.chapterTitle}</div>
                            <div className="description">{chapter.chapterDescription}</div>

                            <button className="table-action-btn table-edit-btn" onClick={() => handleEditClick(chapter)}>Edit</button>
                            <button className="table-action-btn table-delete-btn" >Delete</button>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
