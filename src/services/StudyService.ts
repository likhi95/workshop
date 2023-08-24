export default class StudyService {
    private subjects = [
        {
            id: 1,
            title: "Subject 1",
            chapters: [
                { id: 1, title: "Title 1", description: "Some test" }
            ]
        },
        {
            id: 2,
            title: "Subject 2",
            chapters: [
                { id: 2, title: "Title 2", description: "Some test" }
            ]
        },
    ];

    getSubjects = async (searchText:string) => {
        return this.subjects;
    }

    getSingleSubject = async (id: number) => {
        
        return this.subjects.filter(x => x.id == id)[0]
    }
}