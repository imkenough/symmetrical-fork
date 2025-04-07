## Issues 
_Right now, the app uses Node.js’s_ `os` _module to gather PC stats in an Electron environment. While this technically works, under the hood it ends up spawning a new PowerShell process for each individual stat. This quickly adds up when the app is running and ironically maxes out system resources, hitting 100% usage. There’s probably a better workaround for this, but I’m currently too busy to look into it._

### App Screenshot: 
![app screenshot](https://github.com/user-attachments/assets/aca166ad-7242-466f-aa9a-6455e2744742)

### Task Manager Screenshot (when app is running):
![task manager screenshot](https://github.com/user-attachments/assets/caa46111-31ef-4d92-a3c4-f7534da3aeb4)

---
# PC Stats Monitor

A desktop application that displays real-time system resource statistics including CPU, memory, disk, and network information. Built with Electron and Next.js with Shadcn/ui components.

## Features

- **Real-time CPU monitoring**: View CPU model, speed, and per-core usage
- **Memory usage**: Monitor RAM and swap usage
- **Disk storage**: See disk space utilization for all mounted drives
- **Network activity**: Track network interface activity, download/upload speeds
- **System information**: View operating system details and application uptime
- **Clean, modern UI**: Built with shadcn/ui components and a responsive design

## Tech Stack

- **Electron**: For creating the desktop application
- **Next.js**: React framework
- **shadcn/ui**: UI component library
- **systeminformation**: For collecting system resource data
- **TypeScript**: For type safety

## Development

### Prerequisites

- Node.js 16+ or Bun
- Windows, macOS, or Linux

### Installation

```bash
# Clone the repository
git clone https://github.com/imkenough/symmetrical-fork.git

# Navigate to the project directory
cd symmetrical-fork

# Install dependencies
npm install

# Start the development server
npm run electron:dev
```

### Building for Production

```bash
# Build for production
npm run electron:build
```

This will create distributable packages in the `dist` directory.

## Screenshots

![overview section](https://github.com/user-attachments/assets/49a29123-a4df-4cf1-a95d-2dbbb4d668b3)

![CPU section](https://github.com/user-attachments/assets/e330006a-281a-40fe-a181-65dfcb1aa3d6)

