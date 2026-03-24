# Project Name: ScholarFlow (School Management SaaS)

**Target Market:** Secondary Schools (focusing on efficiency and communication).
**Tech Stack:** Next.js (App Router), TypeScript, Material UI (MUI), PostgreSQL (Prisma).

## Product Overview:
ScholarFlow is a streamlined School Management System designed to replace fragmented manual processes with a centralized digital hub. Unlike bloated legacy systems, ScholarFlow focuses on three high-impact pillars:
- **Financial Transparency** (Fee tracking & automated receipts).
- **Academic Automation** (Excel-like grade entry & PDF report card generation).
- **Inclusive Communication** (Direct WhatsApp integration for parent-school engagement).

## User Personas & Workflows:

### School Admin (Web Dashboard): The "Superuser." 
They configure the school (Classes, Subjects), onboard Staff, and assign Teachers to specific Classes or Subjects. They oversee the "Master Ledger" of student fees and approve final report cards.

### Teacher (Web/Mobile Responsive): The "Data Provider." 
They have a personalized dashboard showing only their assigned tasks. They take attendance (if they are a Class Teacher) and enter CA/Exam scores (if they are a Subject Teacher).

### Parent (Mobile App - *Phase 2*): The "Consumer." 
*(Note: We will not handle the parent mobile app for now, we will handle that later)*
They view their child's attendance, grades, and pay fees via an integrated payment gateway.

## Core Design Philosophy:
- **Simplicity & Density:** The UI should be clean but data-dense (like a professional dashboard), reducing clicks for repetitive tasks.
- **Relational Logic:** The UI must reflect the underlying PostgreSQL structure (Schools -> Classes -> Subjects -> Teachers -> Students).
- **Action-Oriented:** Every screen should have a clear "Primary Action" (e.g., "Add Student," "Download Receipt," "Send WhatsApp").

## Technical Requirements for UI Generation:
- Use MUI (Material UI) components for all layouts.
- Implement TypeScript interfaces for all data models (Student, Teacher, Grade, Transaction).
- Ensure Responsive Design (Web for Admins, Mobile-First for Teachers).
- Use Next.js Server Components where possible for data fetching.
