#Minitwitter
This project includes a small Twitter with the possibility to register and create blog entries.

##Installation
Condition
- Node.js or Bun
- Docker & Docker Compose

###To install with Bun:
git clone https://github.com/dein-benutzername/Transferarbeit.git
cd Transferarbeit
bun install

##Usage
To start with docker:
docker-compose up -d

###To start in development mode:
bun run dev

##Configuration
- Drizzle ORM: Configuration in drizzle.config.ts
- Ngnix: Configuration file nginx.conf

##Tests
bun test
or
bun run load-test.ts

##Participate
1. Fork the repository
2. Create a feature branch
3. Committee your changes
4. Push into the branch
5. Create a pull request

##License
This project is licensed under the MIT license.

##Code Organization
One component/feature per file
Max file length: 1000 lines
Max function length: 40 lines
Max line length: 80 characters
Use meaningful variable names
Follow Single Responsibility Principle