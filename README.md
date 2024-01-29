# Yards Task

Hierarchical UI for a company that shows all the employees.
Hierarchy
```
|— CEO
  |— Head of staff/HR
    |—Team 1
      |— Team leader
        |— Team member
    |—Team 2
      |— Team leader
        |— Team member
  |— Head of engineering
    |—Team
        |— Team leader
          |— Team member
  |— Head of design
    |—Team
        |— Team leader
          |— Team member
```

**Note:** Under each Head, there can be multiple Teams. Each team will have a team leader Under each Team leader, there should be at least one team member.

**Details you need to store for each employee.**
- Name, ID, Phone Number, Email ID

## Table of Contents

1. [Dependency Used](#dependency-used)
2. [Data Structure](#data-structure)
3. [Screens](#screens)
4. [Components](#components)
5. [Project Structure](#project-structure)
6. [Functionality](#functionality)

## Dependency Used

- @react-native-async-storage/async-storage
- redux-persist
- react-redux
- @reduxjs/toolkit
- react-native-gesture-handler
- react-native-modal-selector
- react-native-safe-area-context
- @react-navigation/native
- @react-navigation/stack

## Data Structure

The project's data structure follows a type of parent-child hierarchy. Here's an overview of the structure:

```typescript
export const employeeData: EmployeeData[] = [
  {
    role: 'CEO',
    name: 'Name of CEO',
    email: 'ceo@company.com',
    phoneNumber: '1234567890',
    id: '1',
    department: 'CEO',
    team: '',
    children: [
      {
        role: 'Head of staff/HR',
        name: 'Name of HR',
        email: '',
        phoneNumber: '',
        id: '',
        department: 'STAFF/HR',
        team: '',
        children: [
          {
            role: 'Team 1',
            name: 'Name of Team 1',
            id: '',
            department: 'STAFF/HR',
            team: 'Team 1',
            children: [
              {
                role: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'STAFF/HR',
                team: 'Team 1',
                children: [
                  {
                    role: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'STAFF/HR',
                    team: 'Team 1',
                  },
                  {
                    role: 'Team member',
                    name: 'Name of Another Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'STAFF/HR',
                    team: 'Team 1',
                  },
                ],
              },
            ],
          },
          {
            role: 'Team 2',
            name: 'Name of Team 2',
            id: '',
            department: 'STAFF/HR',
            team: 'Team 2',
            children: [
              {
                role: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'STAFF/HR',
                team: 'Team 2',
                children: [
                  {
                    role: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'STAFF/HR',
                    team: 'Team 2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        role: 'Head of engineering',
        name: 'Name of engineering head',
        email: '',
        phoneNumber: '',
        id: '',
        department: 'ENGINEERING',
        team: '',
        children: [
          {
            role: 'Team 3',
            name: 'Name of Team 3',
            id: '',
            department: DEPARTMENT.ENGINEERING,
            team: 'Team 3',
            children: [
              {
                role: 'Team Leader',
                name: 'Name of Team leader',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'ENGINEERING',
                team: 'Team 3',
                children: [
                  {
                    role: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'ENGINEERING',
                    team: 'Team 3',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        role: 'Head of design',
        name: 'Name of design head',
        email: '',
        phoneNumber: '',
        id: '',
        department: 'DESIGN',
        team: '',
        children: [
          {
            role: 'Team 4',
            name: 'Team name 4',
            id: '',
            department: 'DESIGN',
            team: 'Team 4',
            children: [
              {
                role: 'Team Leader',
                name: 'Team leader name',
                email: '',
                phoneNumber: '',
                id: '',
                department: 'DESIGN',
                team: 'Team 4',
                children: [
                  {
                    role: 'Team member',
                    name: 'Name of Team member',
                    email: '',
                    phoneNumber: '',
                    id: '',
                    department: 'DESIGN',
                    team: 'Team 4',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
```

## Screens

The project contains the following screens:

- HomeScreen
- HierarchyScreen
- FilteredEmployeesScreen
- EmployeeFormScreen
- rTeamFormScreen

## Components

The project includes the following component:

- EmployeeComponent

## Project Structure

- Project Root folder
  - src
    - assets
      - images
        - ic_add.png
        - ic_delete.png
        - ic_clear.png
        - ic_edit.png
    - redux
      - hierarchyRedux
        - hierarchySlice.ts
      - hook
        - useAppDispatch.ts
        - useAppNavigation.ts
        - useAppSelector.ts
      - reducer.ts
      - redux.ts
      - selector.ts
      - store.ts
      - type.ts
    - screens
      - components
        - EmployeeComponent.tsx
      - EmployeeFromScreen.tsx
      - FilteredEmployeesScreen.tsx
      - HierarchyScreen.tsx
      - HomeScreen.tsx
      - TeamFormScreen.tsx
      - types.ts
    - App.tsx
    - Constants.ts
    - Index.ts
    - Route.ts
   
## Functionality

The project contains the following functionalities:

- We should be able to see the position name with the employee name.
- We should be able to add a new team member.
- We should be able to change the team of a team member. An employee from HR can't
be moved to the design team.
- We can remove a team member.
- We should be able to update employee information.
- We should be able to create a new Team or edit an existing one.
- Search Filter an employee by Employee Name, Phone Number, and Email ID.
- Two teams cannot have the same name.
  

