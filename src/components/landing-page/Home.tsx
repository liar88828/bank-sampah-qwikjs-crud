import { component$ } from "@builder.io/qwik";
import { Head } from "./head";
import { Brand } from "./brand";
import { GridComponent } from "./grid-component";
import { GridComponen2 } from "./grid-component2";
import { Speak } from "./speak";
import { Designed } from "./designed";
import { Questions } from "./questions";
import { Trial } from "./trial";
import { Footer } from "./footer";
import { Hero } from "./hero";

export const Home = component$(() => {
  return (
    <div>
      {/* <Hero /> */}
      <Head />
      <Brand />
      <GridComponent />
      <GridComponen2 />
      <Speak />
      <Designed />
      <Questions />
      <Trial />
      <Footer />
    </div>
  );
});
