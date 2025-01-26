# Playwright automation demo

Playwright automation demo with page object model

Tests some of the functionality of

1. https://automationintesting.online/

## Instructions

clone the repository, then in vscode terminal, run => npm install

to execute the playwright tests, use the command => env=prod npm run test:env

alternatively, as the environment currently defaults to prod without specifying an environment you may use command => npm test

# Test Plan

## Objective

The objective of this automation test plan is to define the scope, approach, resources, and schedule for exploratory testing of the website https://automationintesting.online/.

As there are no formal requirements, the primary goal is to identify defects in critical paths, validate core functionality, and explore unexpected behaviors within the application through exploratory testing methods.

Non-functional testing areas, such as performance and security, are acknowledged but currently out of scope for this specific automation task.

## Scope of Testing

The website provides a mock application for practicing test automation. Testing will focus on:

### Exploratory Functional Testing:

Login processes.

Booking workflows (booking, creating and modifying rooms).

Contact form functionality.

Validation of error messages.

### Out-of-Scope Testing:

Performance Testing

Security Testing

Usability Testing

## Approach

### Tools and Frameworks

Automation Framework: Playwright using the Page Object Model (POM).

Programming Language: TypeScript.

Reporting: HTML reporting.

### Exploratory Testing Techniques

Session-Based Testing: Each session will explore a specific area of functionality, such as the room booking process or admin dashboard.

Error Guessing: Focus on areas likely to fail, such as blank or unexpected inputs, and edge cases.

Heuristics-Based Testing: Use heuristics like CRUD (Create, Read, Update, Delete) operations to guide test case generation.

### Automation Design

Dynamic Script Creation: Automated scripts will adapt to findings during exploratory sessions.

Data-Driven Testing: Use multiple test datasets to discover edge cases.

## Test Environment

### Test Environments Setup

URL: https://automationintesting.online/

Browsers: Chrome, Firefox, Safari.

Operating Systems: Windows, macOS, and Linux.

## Test Data Management

Exploratory testing requires:

Dynamic test data generation.

Preconfigured datasets for room availability and user credentials.

Randomized data inputs to uncover unexpected issues.

## Test Execution

### Execution Plan

Exploratory Sessions: Each session will target a specific area of the application (e.g., room booking or room creation).

Regression Testing: Automated scripts from exploratory findings will be integrated into a regression suite.

Session Notes: Observations, findings, and issues from each session will be documented and shared.

### Scheduling

Exploratory Runs: Conducted daily during active development phases.

Regression Runs: Triggered automatically through CI/CD pipelines.

### Defect Tracking

Tool: Jira or Azure DevOps.

Issues will be logged with severity, reproduction steps, and any associated exploratory session notes.

## Reporting

### Test Results

Exploratory testing results will include:

Session summaries.

Number of test cases derived from exploratory findings.

Defects logged and their status.

### Reporting Frequency

Daily Reports: Summarizing session outcomes and defect trends.

## Risks and Mitigation

### Risks

Lack of requirements may lead to missed critical issues.

Dynamic nature of exploratory testing could impact reproducibility.

### Mitigation

Maintain detailed session notes to track test paths.

Use exploratory scripts to automate high-value areas identified during sessions.

## Test Deliverables

Automated scripts.

Session reports and defect logs.

Regression test cases derived from exploratory sessions.

Traceability matrix linking tests to exploratory objectives.

## Roles and Responsibilities

QA Engineers: Conduct exploratory sessions and automate high-value tests.

Test Lead: Define exploratory objectives and review session outcomes.

Developers: Address defects found during exploratory sessions.

DevOps: Support CI/CD integration of exploratory and regression tests.

## Exit Criteria

Testing will conclude when:

All core application workflows are explored and automated

High-severity defects are resolved.

Regression suite provides stable and reliable results.
