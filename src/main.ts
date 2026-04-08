"use strict";

interface course {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

// Formulär 
const form = document.querySelector<HTMLInputElement>("form")!;
// Tabell
const tableBody = document.querySelector("tbody")!;
//Kurkod input
const codeInput = document.getElementById("courseCode") as HTMLInputElement;
//Kursnamn input
const nameInput = document.getElementById("courseName") as HTMLInputElement;
//Progression input
const progInput = document.getElementById("progression") as HTMLInputElement;
//Syllabus Input
const linkInput = document.getElementById("syllabus") as HTMLInputElement;
//Div för felmeddelanden
const errorDiv = document.getElementById("error") as HTMLDivElement;
//Array för felmeddelanden
let errors: string[];
//Array för kurskoder
let courseCodeArr: string[] = [];

//Array för tillagda kurser 
let courseArr: course[] = JSON.parse(localStorage.getItem("courses") || "[]");

document.addEventListener("DOMContentLoaded", () => {
    printCourses();


    //Händelselyssnare på klick på sumbit formulär
    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();

        errors = [];
        //tömmer div för felmeddelanden mellan varje klick
        errorDiv.innerHTML = "";

        //Validering för ifyllnad som genererar felmeddelanden om ngt saknas
        if (codeInput.value == "") {
            errors.push("* Du måste fylla i korrekt kod");
        }

        if (nameInput.value == "") {
            errors.push("* Du måste fylla i ett kursnamn");
        }

        //Validerar att progression är A, B eller C
        if (progInput.value == "" || (progInput.value !== "A" && progInput.value !== "B" && progInput.value !== "C")) {
            errors.push("* Du måste fylla i A, B eller C som kursprogression");
        }

        if (linkInput.value == "") {
            errors.push("* Du måste ange länk till kursplan");
        }

        //Validerar att kurskoden är unik
        if (courseCodeArr.includes(codeInput.value)) {
            errors.push("* Kurskoden du fyller i måste vara unik");
        } else { courseCodeArr.push(codeInput.value); console.log(courseCodeArr);}

        //Om array med felmeddelanden är tom, sparar ifyllda uppgifter i objekt och skickar med i anrop funktion printCourses 
        if (errors.length === 0) {

            //Ett objekt för ifylld kurs
            const newCourse: course = {
                code: codeInput.value,
                name: nameInput.value,
                progression: progInput.value,
                syllabus: linkInput.value,
            }
            printCourses(newCourse);

        }

        /* Loopar igenom array för felmeddelanden och skriver ut i DOM */
        errors.forEach(error => {
            errorDiv.innerHTML += `
    <p>${error}</p>`;
        })

    });
})


function printCourses(writtenCourse?: course): void {
    
    //lägger till objektet för kurs i array om objektet skickats med som argument
    if (writtenCourse) {
        courseArr.push(writtenCourse);
        //konverterar till JSON sträng och sparar i localStorage
        localStorage.setItem("courses", JSON.stringify(courseArr));
    }

    //Tömmer tabellen 
    tableBody.innerHTML = "";
    //loopar igenom arrayen 
    courseArr.forEach(course => {
        //Skriver ut kurs i DOM 
        tableBody.innerHTML +=
            `<tr id=${course.code}>
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td><a href=${course.syllabus}>länk</a></td>
            <td>${course.progression}</td>
            <td><button class="deleteBtn" id= ${course.code}>Ta bort</button></td>
          </tr>`;
        
    })

    //deleteknappar
    const deleteBtn = document.querySelectorAll(".deleteBtn");

    if (deleteBtn !== null) {
        deleteBtn.forEach(button => {
            button.addEventListener("click", ()=>{
                deleteCourses(button.id, );
            }); 

        });
    }

}

function deleteCourses(buttonid: string): void {
    console.log("kurser raderas för knapp " + buttonid);
    // En array med endast de kurser som inte ska tas bort
    const newCourseArr = courseArr.filter(course => course.code !== buttonid);
    //sätter värdet på arrayen som gör getItem till den nya arrayen
    courseArr = newCourseArr;
    //sätter det nya värdet i localStorage
    localStorage.setItem("courses", JSON.stringify(courseArr));
    //anropar funktion utan argument (då läggs kurser i arrayen till i DOM)
    printCourses();
}
