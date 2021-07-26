import dotenv from "dotenv";
import { port } from "./config/index";
// import app module
import app from './components/app';

dotenv.config();

export function bootstrap(): void {
  try {
    // init db connection

    /**
     * Start Express server.
     */
    app.get('/', (res: any) => {
      res.status(200).send()
    });
    app.listen(port, () => console.log(`Running on port ${port}`));
    // app.listen(app.get("/"), (res: Response) => {
    //   console.log(
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //     `App is running at http://localhost:${app.get("port")} in ${app.get(
    //       "env"
    //     )} mode`
    //   );
       
    //   console.log("  Press CTRL-C to stop\n");
    // });
  } catch (error) {
    console.log(error, "This shouldn't be happening");
  }
}

bootstrap();

// const port = 5000
// app.get('/', (_, res) => {
//   res.status(200).send()
// })
// app.listen(port, () => console.log(`Running on port ${port}`))

// export * from "./utils/typeUtils";
// export * from "./components/auth/middleware";
// export * from "./components/auth/validation";
// export { registerInput } from "./components/auth/controller";
// export { getInviteData } from "./publicTypes/index";