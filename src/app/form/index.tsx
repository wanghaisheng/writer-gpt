"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Circle, Loader2, Play } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { z } from "zod";

import {
  contentPrompt,
  outlineToArraySystemPrompt,
  systemPrompt
} from "@config/chat";
import { title } from "@config/seo";

import { PostSection } from "@interface/structure";

import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import ThemeSwitch from "@components/ThemeSwitch";
import { TokenForm } from "@components/Token";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

import { chat } from "@lib/openai";

import { KeyWordsInputs } from "./inputs/keywords";
import { OutlineInput } from "./inputs/outline";

export const generateContent = z.object({
  keywords: z.object({
    main: z.string().min(1, { message: "Please add main keywords!" }),
    secondary: z.string().min(1, { message: "Please add secondary keywords!" })
  }),
  outline: z.string().min(1, { message: "Please add outline!" })
});

export type GenerateContent = z.infer<typeof generateContent>;

export const Form = () => {
  const { token } = useToken();
  const { settings } = useSettings();

  const [loading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] =
    useState<string>(`## Introduction: A Personal Voyage into the World of Nautical Adventures

  Ahoy, fellow sea-faring enthusiasts! I once was a landlubber like you, curious and longing to delve into the enchanting and enticing world of nautical escapades. In this journey, I've encountered the serene pleasures of leisurely boat rides, stared into the depths of oceanic abysses, and felt the unparalleled thrill of battling with tempestuous waves. And now, I'm here to share my wealth of knowledge and insights so that you may embark on your unforgettable adventure.
  
  ### Set Sail on an Unforgettable Journey
  
  As the saying goes, "the ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul." Take it from someone who's found solace in the gentle rocking of a sailboat along the New England coast and felt the electrifying rush coursing through their veins while navigating the treacherous rapids in Iceland's Hvítá River. The depth and breadth of experiences found in nautical escapades are unparalleled - they'll get you hooked on the sailing life before you can say "anchors aweigh!"
  
  ### Explore the Captivating World of Nautical Escapades
  
  From sampling exquisite cuisine aboard a luxurious Mediterranean yacht charter to the thrills of pushing your body's limits while kiteboarding in the crystal-clear waters of Tarifa, Spain, the maritime world has a treasure chest of surprises waiting to be discovered. Cultivate your inner pirate spirit as you step off the gangway and into a universe of high-seas mystery, romance, and adventure.
  
  Great examples of diverse nautical escapades include:
  
  -   **Secluded Spots**: Cruise through the enchanting waterways of Venice before dropping anchor in a cozy hidden lagoon that is only accessible by gondola or water taxi.
      
  -   **Historic Adventures**: Follow in the footsteps of Captain James Cook by charting your course through the breathtaking vistas of the South Pacific and retracing the famous explorer's voyage.
      
  -   **Eco-conscious Exploration**: Sail along the coastline of the Great Barrier Reef in Australia, taking in the abundant marine life and stunning coral formations while practicing responsible tourism to preserve these natural wonders for future generations.
      
  
  ### A First-Person Narrative: Personal Insights and Humor
  
  Have you ever wondered how it feels to have the wind whip through your hair as your catamaran zips across the glittering of the Caribbean at breakneck speed? Or perhaps you've imagined yourself a daring buccaneer, sashaying your way through the bustling markets of Tortuga, keys jingling as you exchange your plunder for some choice rum? With vivid details and anecdotes that will make you feel like you're right there beside me, I'll transport you to the heart of these extraordinary adventures.
  
  But fear not, for this journey shall not be without a hearty helping of humor. From misadventures with a rogue octopus that decided my gear bag was its new home to a comical nautical faux pas that left me dressed as Blackbeard at a high-class sailing gala, I shall regale you with tales that are both informative and hilariously entertaining.
  
  It's time to cast off the moorings, hoist your sails, and join me as we probe the fascinating wonders of the nautical world. Adventure awaits us, my trusty shipmates!
  
  | Milestone | Nautical Adventure | Unsung Hero of the Trip | 
  |-----------|--------------------|-------------------------| 
  | 1. | Island-hopping in Greece | The ever-reliable sunscreen | 
  | 2. | Northern Lights Cruise in Norway | Thermos filled with hot cocoa | 
  | 3. | Sailing on a traditional Tall Ship | A trusty weather app | 
  | 4. | Caribbean catamaran flotilla | Perfectly mixed mojitos |
  
  ## Section 1: A Guide to Nautical Vessels
  
  ### Cruising on the High Seas: The Allure of Yachts
  
  As a connoisseur of all things "boat", I must profess that there's something about the elegance and sophistication of a yacht that truly captivates the imagination. My personal favorite is the  _sailing yacht_, which harnesses the power of the wind for propulsion, while its motorized cousin, the  _motor yacht_, relies on good old-fashioned engine power. If money were no object, I'd surely be whisked away on a  _superyacht_  the size of a small town.
  
  Ahoy there, landlubbers! Here's a table to give you an idea of these luxurious vessels:
  
  | Type of Yacht | Length (ft) | Key Features | | -------------------------- | ------------ | ------------------------------------------------------------------------------ | | Sailing Yacht | 30 - 200+ | Sail-powered, sleek design, smaller and environmentally friendly option | | Motor Yacht | 40 - 160 | Engine-driven, faster, often provide more space and amenities | | Superyacht | 100 - 500+ | Unrivaled luxury and amenities, often includes crew, helipads, and submarines |
  
  During my own seafaring escapades, I've found that popular yacht destinations include:
  
  1.  The Caribbean - Crystal-clear waters and sun-soaked beaches
  2.  The Mediterranean - Rich history and enchanting coastal towns
  3.  The South Pacific - Exotic locales and diverse marine life
  
  Remember, pulling off a memorable yacht trip entails meticulous planning. Account for the cost, size, crew, and navigation equipment before you cast off.
  
  ### Go with the Flow: Canoeing and Kayaking
  
  When I'm not gallivanting on yachts, I enjoy getting closer to nature with a canoe or kayak. These unsung heroes of the nautical world come in various shapes and sizes, from slender race-ready kayaks to wide and sturdy canoes fit for a family expedition.
  
  | Canoe | Kayak | | ------------------------------------ | -------------------------------------------------------------------- | | Open deck, multiple seats, more stable | Closed cockpit, one or two seats, narrower and faster | | Ideal for lakes, slow-moving rivers | Suitable for open seas, rivers, and whitewater rapids |
  
  Some of my go-to destinations for canoeing and kayaking include:
  
  -   The Florida Everglades: For encounters with wildlife (just steer clear of those gators!)
  -   The Amazon Rainforest: Where dense jungles create a surreal setting
  -   The Norwegian Fjords: Featuring breathtaking natural beauty like no other
  
  Safety first! Don the right gear, like a lifejacket and a helmet, and educate yourself on local regulations and weather conditions.
  
  ### Brave the Rapids: The Thrill of Rafting
  
  Between you and me, nothing gets my heart pumping faster than the adrenaline rush of rafting! Whether it's churning whitewater rapids, a scenic river journey, or a daring ocean adventure, rafting offers something for everyone.
  
  Notable rafting locations include:
  
  -   Colorado River, USA: For dramatic canyons and top-notch whitewater
  -   Zambezi River, Zambia/Zimbabwe: When action-packed escapades meet African wildlife
  -   Futaleufú River, Chile: Throw in some jaw-dropping mountain vistas, and you've got yourself a winner
  
  Just remember that what truly separates a harrowing rafting misadventure from a heart-pounding (yet successful) one lies in your preparedness. Hone your skills, keep the right equipment on hand, and have a knowledgeable guide to navigate you through the rapids.
  
  ### Classic Sailing and Boating: A Timeless Journey
  
  Before the advent of engines, sailing ships ruled the oceans. While modernity has caught up, these wind-powered vessels retain their charm. In my moments of nostalgia, I sometimes trade my yacht for a good ol' sailboat – and I must admit, it's just as wonderful an experience.
  
  Become acquainted with the nautical lexicon before embarking on your maritime journey. Here are a few essential terms:
  
  -   Bow: Front of the ship
  -   Stern: Rear end of the ship
  -   Port: Left side of the ship when facing the bow
  -   Starboard: Right side of the ship when facing the bow
  
  And let's not forget about boating rentals and lessons! You don't have to purchase a watercraft to enjoy a marine adventure – simply rent one, or take sailing lessons to set yourself on course for an unforgettable nautical escapade.`);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<GenerateContent>({
    resolver: zodResolver(generateContent),
    defaultValues: {
      keywords: {
        main: "",
        secondary: ""
      },
      outline: ""
    }
  });

  const outline = watch("outline");

  const onSubmit = handleSubmit(async payload => {
    if (!token) return;

    setLoading(true);

    let sections: PostSection[] = [];

    try {
      const response = await chat({
        key: token,
        model: settings.model.outline,
        messages: [
          {
            role: "system",
            content: outlineToArraySystemPrompt
          },
          {
            role: "user",
            content: outline
          }
        ]
      });

      if (response) sections = JSON.parse(response) as unknown as PostSection[];
    } catch (error) {
      console.log("Failed to make section structure");

      return;
      // Handle fetch request errors
    }

    try {
      for (const section of sections) {
        try {
          const response = await chat({
            key: token,
            model: settings.model.outline,
            messages: [
              {
                role: "system",
                content: systemPrompt
              },
              {
                role: "assistant",
                content: outline
              },
              {
                role: "user",
                content: contentPrompt
                  .replaceAll(`{{heading}}`, section.heading)
                  .replaceAll(`{{subpoints}}`, section.subpoints.join(", "))
              }
            ]
          });

          if (response) setPostContent(prevState => `${prevState}${response}`);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  });

  return (
    <div className="flex flex-col w-full max-w-3xl gap-8 py-10">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between gap-4">
        <div className="flex items-center flex-col sm:flex-row gap-4">
          <h1 className="text-2xl font-semibold flex items-center">
            <Circle className="fill-blue-600 stroke-blue-600 mr-2" /> {title}
          </h1>

          <Separator orientation="vertical" className="h-8 hidden sm:flex" />
          <Separator orientation="horizontal" className="sm:hidden" />

          <p className="flex items-center">
            <AlertTriangle className="text-yellow-600 mr-2" /> Under
            Construction
          </p>
        </div>

        <ThemeSwitch />
      </div>

      <TokenForm />

      <form className="flex flex-col gap-4 w-full flex-1" onSubmit={onSubmit}>
        <KeyWordsInputs
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <OutlineInput
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <Button
          type="submit"
          variant="blue"
          className="md:col-start-6"
          disabled={loading || !outline.trim()}
        >
          {!loading && <Play className="w-6 h-6" />}
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span className="ml-2">Generate</span>
        </Button>
      </form>

      <div className="p-4 rounded-sm border">
        <ReactMarkdown>{postContent}</ReactMarkdown>
      </div>
    </div>
  );
};
