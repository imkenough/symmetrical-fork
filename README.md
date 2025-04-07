This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# PC Stats Monitor

A desktop application that displays real-time system resource statistics including CPU, memory, disk, and network information. Built with Electron and Next.js with shadcn/ui components.

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
git clone https://github.com/yourusername/pc-stats-monitor.git

# Navigate to the project directory
cd pc-stats-monitor

# Install dependencies
bun install

# Start the development server
bun run electron:dev
```

### Building for Production

```bash
# Build for production
bun run electron:build
```

This will create distributable packages in the `dist` directory.

## Screenshots

![PC Stats Monitor - Overview](screenshots/overview.png)
![PC Stats Monitor - CPU](screenshots/cpu.png)

## License

MIT

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
