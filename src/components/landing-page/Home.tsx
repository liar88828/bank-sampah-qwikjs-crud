import { component$ } from "@builder.io/qwik";
import { Head } from "./head";
import { Brand } from "./brand";
import { GridComponent } from "./grid-component";
import { GridComponent2 } from "./grid-component2";
import { Speak } from "./speak";
import { Designed } from "./designed";
import { Questions } from "./questions";
import { Trial } from "./trial";
import { Footer } from "./footer"

export const Home = component$(() => {
  return (
    <div class=" space-y-10">
      {/* <Hero /> */}
      <Head />
      <Brand />
      <GridComponent />
      <GridComponent2 />
      <Speak />
      <Designed />
      <Questions />
      <Trial />
      <Footer />
      
      
    </div>
  );
});
