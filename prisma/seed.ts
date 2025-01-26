import { PrismaClient, UserSex, Day } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // CLASS
  const classData = [
    "Form 1", "Form 2", "Form 3", "Form 4 Arts", "Form 4 Science",
    "Form 5 Arts", "Form 5 Science", "Lower Sixth Arts", "Lower Sixth Science",
    "Upper Sixth Arts", "Upper Sixth Science",
  ];

  for (const className of classData) {
    await prisma.class.create({
      data: {
        name: className,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // SUBJECTS
  const subjects = [
    "Mathematics", "Biology", "English", "History", "Geography", "Physics",
    "Chemistry", "Computer Science", "French", "Logic", "Economics",
    "Food Science", "Geology", "Pure Mathematics with Statistics",
    "Pure Mathematics with Mechanics", "Further Mathematics",
    "Additional Mathematics", "Food and Nutrition", "Civic Education",
    "Physical Education", "Literature", "Religion", "Philosophy",
    "Information and Communication Technology", "Spanish",
  ];

  for (const name of subjects) {
    await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // TEACHERS
  for (let i = 1; i <= 50; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
        subjects: { connect: [{ id: (i % 25) + 1 }] }, 
        classes: { connect: [{ id: (i % 11) + 1 }] },
      },
    });
  }

  // PARENTS
  for (let i = 1; i <= 25; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName${i}`,
        surname: `PSurname${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
  }

  // STUDENTS
  for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        classId: (i % 11) + 1,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        parentId: `parentId${Math.ceil(i / 2)}`,
      },
    });
  }


  // LESSONS
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`, 
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ], 
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)), 
        subjectId: (i % 25) + 1, 
        classId: (i % 11) + 1, 
        teacherId: `teacher${(i % 50) + 1}`, 
      },
    });
  }

  // EXAMS
  for (let i = 1; i <= 25; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ASSIGNMENTS
  for (let i = 1; i <= 25; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().getDate() + 1),
        lessonId: (i % 25) + 1,
      },
    });
  }

  // RESULTS
  for (let i = 1; i <= 50; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: `student${i}`,
        ...(i <= 25 ? { examId: i } : { assignmentId: i - 25 }),
      },
    });
  }

  // ATTENDANCES
  for (let i = 1; i <= 50; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }

  // EVENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 5) + 1,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
