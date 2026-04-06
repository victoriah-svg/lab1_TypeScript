"use strict";

interface course {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}


// Formulär 
const form = document.querySelector<HTMLInputElement>("form")!;
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
    }else{courseCodeArr.push(codeInput.value);}
    
    
    if(errors.length === 0 ) {
        
        console.log(courseCodeArr);
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

function printCourses(writtenCourse: course):void {
   /* //hämtar array från localStorage 
    let courseArr: course[]= JSON.parse(localStorage.getItem("courses") || "[]");
    //lägger till objektet för kurs i array
    courseArr.push(writtenCourse);
    //konverterar till sträng och sparar i localStorage
    localStorage.setItem("courses", JSON.stringify(courseArr));

    //loopar igenom arrayen 
    courseArr.forEach(course =>{
        //Skriv ut i DOM här 
        //funktion för att radera kurs
       // console.log("Code: " + course.code, "Name: " + course.name, "progression :" + course.progression);
    })
   // console.log(courseArr);*/
    console.log("Hej från printcourses");
   localStorage.setItem(`${writtenCourse.code}`, JSON.stringify(writtenCourse));
}