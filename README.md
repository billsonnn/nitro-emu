# nitro-emulator

For the latest updates join us on Discord: [https://discord.gg/4K7MEMz](https://discord.gg/4K7MEMz)

## Setup
run `npm i`

rename `.env.new` to `.env` and modify the settings

rename `dbconfig.json.new` to `dbconfig.json` and modify the settings

you will also have to modify `/src/app/Application.ts`

run `npm run start:dev` the server will automatically restart when any changes are detected

### Database
to generate a clean database set `synchronize` to `true` in `dbconfig.json` and run the server, then change it to `false`

for a clean database with default data, import `cleandb.sql` to your mysql database