const request = require("supertest");
const app = require("../../../index");
const Course = require("../../../models/Course");

// ============================================================
// ======================== POST METHOD =======================
// ============================================================
describe("POST /courses/create", () => {
  // ============================================================
  // Name Equivalence Classes
  // ============================================================
  describe("Name Field", () => {
    it("should create a new course with valid name and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if name is invalid", async () => {
      const newCourseData = {
        name: "123",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if name is empty", async () => {
      const newCourseData = {
        name: "",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Instructor Equivalence Classes
  // ============================================================
  describe("Instructor Field", () => {
    it("should create a new course with valid instructor and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if instructor is invalid", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "123",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if instructor is empty", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Email Equivalence Classes
  // ============================================================
  describe("Email Field", () => {
    it("should create a new course with valid email and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if email is invalid", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if email is empty", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // University Equivalence Classes
  // ============================================================
  describe("University Field", () => {
    it("should create a new course with valid university and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if university is invalid", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "123",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if university is empty", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Year Equivalence Classes
  // ============================================================
  describe("Year Field", () => {
    it("should create a new course with valid year and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if year is invalid", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "abc",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if year is empty", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Description Equivalence Classes
  // ============================================================
  describe("Description Field", () => {
    it("should create a new course with valid description and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if description is invalid", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "123",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if description is empty", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // UserID Equivalence Classes
  // ============================================================
  describe("UserID Field", () => {
    it("should create a new course with valid UserID and return status code 200", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "658964aeacfe9dbdb12ad5f1",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Course added!");
      const createdCourse = await Course.findOne({ name: newCourseData.name });
      expect(createdCourse).toBeTruthy();
      expect(createdCourse.name).toBe(newCourseData.name);
      expect(createdCourse.instructor).toBe(newCourseData.instructor);
      expect(createdCourse.email).toBe(newCourseData.email);
      expect(createdCourse.university).toBe(newCourseData.university);
      expect(createdCourse.year).toBe(newCourseData.year);
      expect(createdCourse.description).toBe(newCourseData.description);
    });

    it("should return status code 500 if UserID is invalid", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "invalid_user_id",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });

    it("should return status code 500 if UserID is empty", async () => {
      const newCourseData = {
        name: "Test Course",
        instructor: "Test Instructor",
        email: "test@example.com",
        university: "Test University",
        year: "2022",
        description: "Test Description",
        userId: "",
      };
      const response = await request(app)
        .post("/courses/create")
        .field("name", newCourseData.name)
        .field("instructor", newCourseData.instructor)
        .field("email", newCourseData.email)
        .field("university", newCourseData.university)
        .field("year", newCourseData.year)
        .field("description", newCourseData.description)
        .field("userId", newCourseData.userId);
      expect(response.status).toBe(500);
    });
  });
});

// =================================================================
// ========================== PUT ==================================
// =================================================================
describe("PUT /courses/edit/:courseId", () => {
  let courseId;

  beforeAll(async () => {
    // Create a course in the database and store its ID
    const newCourse = new Course({
      name: "Test Course",
      instructor: "Test Instructor",
      email: "test@example.com",
      university: "Test University",
      year: "2022",
      description: "Test Description",
      uploader: "658964aeacfe9dbdb12ad5f1",
    });
    const createdCourse = await newCourse.save();
    courseId = createdCourse._id;
  });

  afterAll(async () => {
    // Clean up: Delete the created course after tests
    await Course.findByIdAndDelete(courseId);
  });

  // ============================================================
  // Name Equivalence Classes
  // ============================================================
  describe("Name Field", () => {
    it("should update a course with valid name and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(200);
    });

    it("should return status code 500 if name is invalid", async () => {
      const updatedCourseData = {
        name: "",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
    it("should return status code 500 if name is empty", async () => {
      const updatedCourseData = {
        name: "", // Empty name
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Instructor Equivalence Classes
  // ============================================================
  describe("Instructor Field", () => {
    it("should update a course with valid instructor and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(200);
    });

    it("should return status code 500 if instructor is invalid", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "", // Invalid instructor
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
    it("should return status code 500 if instructor is empty", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "", // Empty instructor
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Email Equivalence Classes
  // ============================================================
  describe("Email Field", () => {
    it("should update a course with valid email and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(200);
    });

    it("should return status code 500 if email is invalid", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "invalid_email", // Invalid email
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
    it("should return status code 500 if email is empty", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "", // Empty email
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // University Equivalence Classes
  // ============================================================
  describe("University Field", () => {
    it("should update a course with valid university and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(200);
    });

    it("should return status code 500 if university is invalid", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "", // Invalid university
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
    it("should return status code 500 if university is empty", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "", // Empty university
        year: "2024",
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Year Equivalence Classes
  // ============================================================
  describe("Year Field", () => {
    it("should update a course with valid year and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024", // Valid year
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(200);
    });

    it("should return status code 500 if year is invalid", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "abcd", // Invalid year
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
    it("should return status code 500 if year is empty", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "", // Empty year
        description: "Updated description",
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
  });

  // ============================================================
  // Description Equivalence Classes
  // ============================================================
  describe("Description Field", () => {
    it("should update a course with valid description and return status code 200", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "Updated description", // Valid description
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(200);
    });

    it("should return status code 500 if description is invalid", async () => {
      const updatedCourseData = {
        name: "Updated Web Engineering",
        instructor: "Updated Dr. Fahad Satti",
        email: "updated.fahad.satti@seecs.edu.pk",
        university: "Updated NUST-H12",
        year: "2024",
        description: "", // Invalid description
      };
      const response = await request(app)
        .put("/courses/edit/" + courseId)
        .field("name", updatedCourseData.name)
        .field("instructor", updatedCourseData.instructor)
        .field("email", updatedCourseData.email)
        .field("university", updatedCourseData.university)
        .field("year", updatedCourseData.year)
        .field("description", updatedCourseData.description);
      expect(response.status).toBe(500);
    });
  });
  it("should return status code 500 if description is empty", async () => {
    const updatedCourseData = {
      name: "Updated Web Engineering",
      instructor: "Updated Dr. Fahad Satti",
      email: "updated.fahad.satti@seecs.edu.pk",
      university: "Updated NUST-H12",
      year: "2024",
      description: "", // Empty description
    };
    const response = await request(app)
      .put("/courses/edit/" + courseId)
      .field("name", updatedCourseData.name)
      .field("instructor", updatedCourseData.instructor)
      .field("email", updatedCourseData.email)
      .field("university", updatedCourseData.university)
      .field("year", updatedCourseData.year)
      .field("description", updatedCourseData.description);
    expect(response.status).toBe(500);
  });
});

// ============================================================
// ======================== SEARCH METHOD =====================
// ============================================================
// Name Equivalence Classes
// ============================================================
describe("Search by Name", () => {
  it("should return status code 200 and search results if query matches name exactly", async () => {
    const query = "Test Course"; // Exact match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 200 and search results if query matches name partially", async () => {
    const query = "Test"; // Partial match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 404 if no results found for the query", async () => {
    const query = "Nonexistent Course"; // Nonexistent query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// ============================================================
// Instructor Equivalence Classes
// ============================================================
describe("Search by Instructor", () => {
  it("should return status code 200 and search results if query matches instructor exactly", async () => {
    const query = "Test Instructor"; // Exact match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 200 and search results if query matches instructor partially", async () => {
    const query = "Test"; // Partial match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 404 if no results found for the query", async () => {
    const query = "Nonexistent Instructor"; // Nonexistent query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// ============================================================
// Email Equivalence Classes
// ============================================================
describe("Search by Email", () => {
  it("should return status code 200 and search results if query matches email exactly", async () => {
    const query = "test@example.com"; // Exact match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 200 and search results if query matches email partially", async () => {
    const query = "example.com"; // Partial match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 404 if no results found for the query", async () => {
    const query = "nonexistent@example.com"; // Nonexistent query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// ============================================================
// University Equivalence Classes
// ============================================================
describe("Search by University", () => {
  it("should return status code 200 and search results if query matches university exactly", async () => {
    const query = "Test University"; // Exact match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 200 and search results if query matches university partially", async () => {
    const query = "Test"; // Partial match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 404 if no results found for the query", async () => {
    const query = "Nonexistent University"; // Nonexistent query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// ============================================================
// Year Equivalence Classes
// ============================================================
describe("Search by Year", () => {
  it("should return status code 200 and search results if query matches year exactly", async () => {
    const query = "2022"; // Exact match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 200 and search results if query matches year partially", async () => {
    const query = "20"; // Partial match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 404 if no results found for the query", async () => {
    const query = "9999"; // Nonexistent query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});

// ============================================================
// Description Equivalence Classes
// ============================================================
describe("Search by Description", () => {
  it("should return status code 200 and search results if query matches description exactly", async () => {
    const query = "Test Description"; // Exact match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 200 and search results if query matches description partially", async () => {
    const query = "Test"; // Partial match query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure search results are returned
  });

  it("should return status code 404 if no results found for the query", async () => {
    const query = "Nonexistent Description"; // Nonexistent query
    const response = await request(app).get(`/courses/search/${query}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No results found");
  });
});
