import React, { useState } from 'react';

// Device specifications
const DEVICES = {
  'iphone-15-pro': {
    name: 'iPhone 15 Pro',
    width: 393,
    height: 852,
    screenRadius: 44,
    frameRadius: 55,
    framePadding: 12,
    notchType: 'island', // dynamic island
    islandWidth: 126,
    islandHeight: 37,
  },
  'iphone-15-pro-max': {
    name: 'iPhone 15 Pro Max',
    width: 430,
    height: 932,
    screenRadius: 48,
    frameRadius: 60,
    framePadding: 14,
    notchType: 'island',
    islandWidth: 126,
    islandHeight: 37,
  },
  'iphone-14': {
    name: 'iPhone 14',
    width: 390,
    height: 844,
    screenRadius: 44,
    frameRadius: 55,
    framePadding: 12,
    notchType: 'notch',
    notchWidth: 160,
    notchHeight: 34,
  },
  'iphone-se': {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    screenRadius: 0,
    frameRadius: 40,
    framePadding: 14,
    notchType: 'none',
    hasHomeButton: true,
  },
  'pixel-8': {
    name: 'Pixel 8',
    width: 412,
    height: 915,
    screenRadius: 40,
    frameRadius: 48,
    framePadding: 10,
    notchType: 'punch', // punch hole camera
    punchSize: 24,
  },
  'galaxy-s24': {
    name: 'Galaxy S24',
    width: 412,
    height: 915,
    screenRadius: 36,
    frameRadius: 44,
    framePadding: 8,
    notchType: 'punch',
    punchSize: 20,
  },
};

// Phone frame wrapper with device selector - Fixed SE bezel
const PhoneFrame = ({ children, device = 'iphone-15-pro', onDeviceChange, onHome, onDoubleClickHome, onSettings, darkMode = true }) => {
  const d = DEVICES[device];
  const isSE = d.hasHomeButton === true;
  
  // Calculate padding for SE vs other devices
  const padTop = isSE ? 65 : d.framePadding;
  const padBottom = isSE ? 80 : d.framePadding;
  const padSide = d.framePadding;
  
  // Total device height for display
  const totalHeight = isSE ? (d.height + 65 + 80) : d.height;
  
  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center overflow-hidden">
      {/* Device selector */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm text-gray-600 font-medium">Device:</span>
        <select 
          value={device}
          onChange={(e) => onDeviceChange?.(e.target.value)}
          className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <optgroup label="iPhone">
            <option value="iphone-15-pro">iPhone 15 Pro</option>
            <option value="iphone-15-pro-max">iPhone 15 Pro Max</option>
            <option value="iphone-14">iPhone 14</option>
            <option value="iphone-se">iPhone SE</option>
          </optgroup>
          <optgroup label="Android">
            <option value="pixel-8">Pixel 8</option>
            <option value="galaxy-s24">Galaxy S24</option>
          </optgroup>
        </select>
        <span className="text-xs text-gray-400">{d.width}×{totalHeight}</span>
      </div>
      
      {/* Device frame */}
      <div className="relative" style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))' }}>
        <div 
          className="relative bg-[#1a1a1c]"
          style={{ 
            borderRadius: d.frameRadius,
            paddingTop: padTop,
            paddingBottom: padBottom,
            paddingLeft: padSide,
            paddingRight: padSide,
          }}
        >
          {/* Side buttons - non-SE iPhones */}
          {device.startsWith('iphone') && !isSE && (
            <>
              <div className="absolute -left-[3px] top-[120px] w-[3px] h-[32px] bg-[#2a2a2c] rounded-l-sm" />
              <div className="absolute -left-[3px] top-[170px] w-[3px] h-[56px] bg-[#2a2a2c] rounded-l-sm" />
              <div className="absolute -left-[3px] top-[235px] w-[3px] h-[56px] bg-[#2a2a2c] rounded-l-sm" />
              <div className="absolute -right-[3px] top-[180px] w-[3px] h-[72px] bg-[#2a2a2c] rounded-r-sm" />
            </>
          )}
          
          {/* SE side buttons */}
          {isSE && (
            <>
              <div className="absolute -left-[3px] top-[80px] w-[3px] h-[24px] bg-[#2a2a2c] rounded-l-sm" />
              <div className="absolute -left-[3px] top-[115px] w-[3px] h-[44px] bg-[#2a2a2c] rounded-l-sm" />
              <div className="absolute -left-[3px] top-[168px] w-[3px] h-[44px] bg-[#2a2a2c] rounded-l-sm" />
              <div className="absolute -right-[3px] top-[100px] w-[3px] h-[50px] bg-[#2a2a2c] rounded-r-sm" />
            </>
          )}
          
          {/* SE top bezel: earpiece + camera */}
          {isSE && (
            <>
              <div className="absolute top-[26px] left-1/2 -translate-x-1/2 w-[50px] h-[5px] bg-[#0a0a0a] rounded-full" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
              <div className="absolute top-[22px] rounded-full" style={{ left: 'calc(50% + 45px)', width: 10, height: 10, background: 'radial-gradient(circle at 30% 30%, #1a1a2e 0%, #000 60%)' }} />
            </>
          )}
          
          {/* SE home button in bottom bezel */}
          {isSE && (
            <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-[54px] h-[54px] rounded-full bg-[#0d0d0d]" style={{ boxShadow: 'inset 0 0 0 3px #2a2a2c' }}>
              <div className="absolute inset-[8px] rounded-full border border-[#3a3a3a]" />
            </div>
          )}
          
          {/* Screen */}
          <div 
            className={`overflow-hidden relative ${darkMode ? 'bg-gray-950' : 'bg-gray-100'}`}
            style={{ width: d.width, height: d.height, borderRadius: d.screenRadius }}
          >
            {/* Dynamic Island */}
            {d.notchType === 'island' && (
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 bg-black rounded-full z-20"
                style={{ width: d.islandWidth, height: d.islandHeight }} />
            )}
            {/* Notch */}
            {d.notchType === 'notch' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black z-20"
                style={{ width: d.notchWidth, height: d.notchHeight, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
            )}
            {/* Punch hole */}
            {d.notchType === 'punch' && (
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 bg-black rounded-full z-20"
                style={{ width: d.punchSize, height: d.punchSize }} />
            )}
            
            {/* Status bar */}
            <div className={`flex items-end justify-between px-6 pb-2 ${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-semibold relative z-10 ${isSE ? 'h-[24px]' : 'h-[54px]'}`}>
              <span>9:41</span>
              <div className="flex gap-1 items-center">
                <svg className="w-[17px] h-[10px]" viewBox="0 0 17 10" fill="currentColor">
                  <path d="M1 3C1 2.4 1.4 2 2 2h1c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V3zM6 2c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V2zM11 1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V1z"/>
                </svg>
                <div className="flex items-center">
                  <div className={`w-[22px] h-[11px] border-[1.5px] ${darkMode ? 'border-white' : 'border-gray-900'} rounded-[3px] flex items-center p-[2px]`}>
                    <div className={`w-[14px] h-[7px] ${darkMode ? 'bg-white' : 'bg-gray-900'} rounded-[1px]`} />
                  </div>
                  <div className={`w-[1px] h-[4px] ${darkMode ? 'bg-white' : 'bg-gray-900'} ml-[1px] rounded-r-sm`} />
                </div>
              </div>
            </div>
            
            {/* Global nav bar */}
            {onHome && onSettings && (
              <div className={`flex items-center justify-between px-3 py-1.5 ${darkMode ? 'bg-gray-950/80' : 'bg-white/80'} backdrop-blur-sm z-10`}>
                <button onClick={onHome} onDoubleClick={onDoubleClickHome} className="text-xl leading-none active:scale-90 transition-transform">🌀</button>
                <button onClick={onSettings} className={`text-xl leading-none active:scale-90 transition-transform ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>☰</button>
              </div>
            )}
            
            {/* App content */}
            <div className={`overflow-hidden flex flex-col ${isSE ? (onHome ? 'h-[calc(100%-24px-36px)]' : 'h-[calc(100%-24px)]') : (onHome ? 'h-[calc(100%-54px-34px-36px)]' : 'h-[calc(100%-54px-34px)]')}`}>
              {children}
            </div>
            
            {/* Home indicator (non-SE) */}
            {!isSE && (
              <div className={`absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] ${darkMode ? 'bg-white' : 'bg-gray-900'} rounded-full opacity-80`} />
            )}
          </div>
        </div>
      </div>
      
      {/* Device info */}
      <div className="mt-4 text-xs text-gray-500">
        {d.name} • Preview Mode
      </div>
    </div>
  );
};

// Categories with icons
const CATEGORIES = [
  { id: 'prediction', name: 'Predictions', icon: '🔮', color: 'amber' },
  { id: 'reasoning', name: 'Reasoning', icon: '🧠', color: 'violet' },
  { id: 'judgment', name: 'Judgment', icon: '⚖️', color: 'teal' },
];

// Question types: 'binary' or 'multiple'
const SAMPLE_QUESTIONS = [
  // ========== ORIGINAL 40 ==========
  { id: 1, type: 'binary', text: "Will Bitcoin exceed $150,000 before July 2026?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Current Price', value: '$97,234' }, { type: 'stat', label: 'ATH', value: '$108,786' }] },
  { id: 2, type: 'multiple', text: "Is a hot dog a sandwich?", category: "reasoning", options: ["Yes, it's bread with filling", "No, it's its own category", "It's a taco (single folded bread)", "Depends on regional definition"], preEvidence: [{ type: 'note', text: 'Merriam-Webster: sandwich = "two or more slices of bread with filling"' }] },
  { id: 3, type: 'binary', text: "Will GPT-5 be released before September 2026?", category: "prediction", preEvidence: [{ type: 'stat', label: 'GPT-4 Release', value: 'March 2023' }] },
  { id: 4, type: 'multiple', text: "Which animal would win in a fight?", category: "judgment", options: ["100 duck-sized horses", "1 horse-sized duck", "It depends on the terrain", "They'd become friends"] },
  { id: 5, type: 'binary', text: "Is this research methodology sound? (Deepfake detection, n=50)", category: "judgment", preEvidence: [{ type: 'stat', label: 'Sample Size', value: 'n=50' }, { type: 'stat', label: 'Claimed Accuracy', value: '95%' }] },
  { id: 6, type: 'multiple', text: "What will be the dominant AI interface by 2030?", category: "prediction", options: ["Text chat", "Voice assistants", "AR/VR agents", "Brain-computer interfaces", "Autonomous agents"] },
  { id: 7, type: 'binary', text: "Is water wet?", category: "reasoning", preEvidence: [{ type: 'note', text: 'Wet = covered in water. Can water cover itself?' }] },
  { id: 8, type: 'multiple', text: "Best programming language for beginners in 2026?", category: "judgment", options: ["Python", "JavaScript", "Scratch/visual coding", "Natural language (AI-assisted)", "Rust"] },
  { id: 9, type: 'binary', text: "Will humans land on Mars before 2035?", category: "prediction", preEvidence: [{ type: 'stat', label: 'SpaceX target', value: '2029' }, { type: 'stat', label: 'NASA target', value: '2040' }] },
  { id: 10, type: 'multiple', text: "Is a Pop-Tart a ravioli?", category: "reasoning", options: ["Yes - filling enclosed in carb wrapper", "No - ravioli must be savory", "No - ravioli must be pasta", "It's actually a dumpling"] },
  { id: 11, type: 'binary', text: "Could an average person beat a goose in a fight?", category: "judgment", preEvidence: [{ type: 'stat', label: 'Avg goose weight', value: '8-14 lbs' }] },
  { id: 12, type: 'multiple', text: "Most likely cause of human extinction?", category: "prediction", options: ["AI/technology", "Climate change", "Pandemic/bioweapon", "Nuclear war", "Asteroid impact"] },
  { id: 13, type: 'binary', text: "Will Taylor Swift announce retirement before 2030?", category: "prediction" },
  { id: 14, type: 'multiple', text: "What should happen to daylight saving time?", category: "judgment", options: ["Keep switching twice a year", "Permanent daylight time", "Permanent standard time", "Let each state decide"] },
  { id: 15, type: 'binary', text: "Will lab-grown meat achieve price parity by 2028?", category: "prediction", preEvidence: [{ type: 'stat', label: '2013 cost', value: '$330,000/burger' }, { type: 'stat', label: '2025 cost', value: '$6/burger' }] },
  { id: 16, type: 'binary', text: "Could Batman beat Superman (no prep, no kryptonite)?", category: "judgment" },
  { id: 17, type: 'multiple', text: "Ship of Theseus: replace every part, same ship?", category: "reasoning", options: ["Yes - continuity of identity", "No - it's a new ship", "The original uses old parts", "Identity is an illusion"] },
  { id: 18, type: 'binary', text: "Will any AI pass an 8-hour Turing test by 2027?", category: "prediction" },
  { id: 19, type: 'binary', text: "Is the simulation hypothesis likely?", category: "reasoning", preEvidence: [{ type: 'note', text: "Bostrom's trilemma argument" }] },
  { id: 20, type: 'multiple', text: "Most important skill for the next decade?", category: "judgment", options: ["AI/ML literacy", "Critical thinking", "Emotional intelligence", "Adaptability", "Domain expertise"] },
  { id: 21, type: 'binary', text: "Is 847 + 256 greater than 1100?", category: "reasoning" },
  { id: 22, type: 'multiple', text: "What color results from mixing red + blue?", category: "reasoning", options: ["Green", "Purple", "Orange", "Brown"] },
  { id: 23, type: 'binary', text: "Does 'rhythm' contain a vowel (a,e,i,o,u)?", category: "reasoning" },
  { id: 24, type: 'multiple', text: "What comes next: 2, 4, 8, 16, __?", category: "reasoning", options: ["24", "32", "20", "18"] },
  { id: 25, type: 'binary', text: "Is Australia larger than Europe (by land area)?", category: "reasoning" },
  { id: 26, type: 'binary', text: "Will electric vehicles exceed 50% of US new car sales by 2030?", category: "prediction", preEvidence: [{ type: 'stat', label: '2024 US EV share', value: '~9%' }] },
  { id: 27, type: 'multiple', text: "Which company will dominate AI by 2030?", category: "prediction", options: ["OpenAI", "Google/DeepMind", "Anthropic", "Meta", "A company that doesn't exist yet"] },
  { id: 28, type: 'binary', text: "Is free will an illusion?", category: "reasoning" },
  { id: 29, type: 'multiple', text: "What's the most ethical diet?", category: "judgment", options: ["Vegan", "Vegetarian", "Pescatarian", "Local/sustainable omnivore", "Lab-grown meat when available"] },
  { id: 30, type: 'binary', text: "Will remote work remain dominant in tech by 2030?", category: "prediction" },
  { id: 31, type: 'binary', text: "Should social media require age verification?", category: "judgment" },
  { id: 32, type: 'multiple', text: "Most overrated tech of the 2020s?", category: "judgment", options: ["NFTs", "Metaverse/VR", "Crypto/blockchain", "AI assistants", "Self-driving cars"] },
  { id: 33, type: 'binary', text: "Will quantum computers break current encryption by 2035?", category: "prediction" },
  { id: 34, type: 'binary', text: "Is cereal a soup?", category: "reasoning" },
  { id: 35, type: 'multiple', text: "Best way to make friends as an adult?", category: "judgment", options: ["Hobbies/clubs", "Through work", "Apps (Bumble BFF, etc.)", "Neighbors/community", "Accept loneliness"] },
  { id: 36, type: 'binary', text: "Is 17 a prime number?", category: "reasoning" },
  { id: 37, type: 'multiple', text: "What is √144?", category: "reasoning", options: ["10", "11", "12", "14"] },
  { id: 38, type: 'binary', text: "Is the Pacific Ocean the largest ocean?", category: "reasoning" },
  { id: 39, type: 'binary', text: "Will a woman be elected US President by 2032?", category: "prediction" },
  { id: 40, type: 'multiple', text: "What age should you be allowed to vote?", category: "judgment", options: ["16", "18", "21", "25", "Any age"] },

  // ========== PREDICTIONS (41-80) ==========
  { id: 41, type: 'binary', text: "Will China's GDP surpass the US by 2035?", category: "prediction", preEvidence: [{ type: 'stat', label: 'US GDP (2024)', value: '$28.8T' }, { type: 'stat', label: 'China GDP (2024)', value: '$18.5T' }] },
  { id: 42, type: 'binary', text: "Will commercial fusion power be operational by 2040?", category: "prediction" },
  { id: 43, type: 'multiple', text: "Which country will lead in AI development by 2035?", category: "prediction", options: ["United States", "China", "European Union", "India", "Distributed/No single leader"] },
  { id: 44, type: 'binary', text: "Will Neuralink have 1,000+ human users by 2030?", category: "prediction", preEvidence: [{ type: 'stat', label: 'First implant', value: 'January 2024' }] },
  { id: 45, type: 'binary', text: "Will global population decline before 2100?", category: "prediction", preEvidence: [{ type: 'stat', label: 'UN projection', value: 'Peak ~10.4B in 2086' }] },
  { id: 46, type: 'multiple', text: "What will cause the next major financial crisis?", category: "prediction", options: ["AI displacement", "Climate disasters", "Sovereign debt", "Crypto collapse", "Geopolitical conflict"] },
  { id: 47, type: 'binary', text: "Will autonomous vehicles be legal in all US states by 2030?", category: "prediction" },
  { id: 48, type: 'binary', text: "Will the US return to the Moon before China?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Artemis III target', value: '2026' }, { type: 'stat', label: 'China target', value: '2030' }] },
  { id: 49, type: 'multiple', text: "What will be the #1 cause of death globally in 2050?", category: "prediction", options: ["Heart disease", "Cancer", "Antimicrobial resistance", "Climate-related", "Mental health/suicide"] },
  { id: 50, type: 'binary', text: "Will any cryptocurrency become legal tender in a G7 nation by 2030?", category: "prediction" },
  { id: 51, type: 'binary', text: "Will average US home prices exceed $500k by 2030?", category: "prediction", preEvidence: [{ type: 'stat', label: '2024 median', value: '$420,000' }] },
  { id: 52, type: 'multiple', text: "Which social platform will have the most users in 2030?", category: "prediction", options: ["TikTok/ByteDance", "Instagram/Meta", "YouTube", "WeChat", "Something new"] },
  { id: 53, type: 'binary', text: "Will deepfakes influence a major election outcome by 2028?", category: "prediction" },
  { id: 54, type: 'binary', text: "Will antibiotics still be effective against most infections in 2040?", category: "prediction" },
  { id: 55, type: 'multiple', text: "What will happen to Twitter/X by 2030?", category: "prediction", options: ["Still dominant", "Acquired by another company", "Bankrupt/shut down", "Transformed into something else", "Niche platform"] },
  { id: 56, type: 'binary', text: "Will a major city become uninhabitable due to climate by 2050?", category: "prediction" },
  { id: 57, type: 'binary', text: "Will commercial space tourism have 10,000+ customers by 2035?", category: "prediction" },
  { id: 58, type: 'multiple', text: "Which industry will AI disrupt most by 2030?", category: "prediction", options: ["Healthcare", "Legal", "Education", "Finance", "Creative/Media"] },
  { id: 59, type: 'binary', text: "Will there be a manned mission to an asteroid by 2040?", category: "prediction" },
  { id: 60, type: 'binary', text: "Will the EU still exist in its current form in 2040?", category: "prediction" },
  { id: 61, type: 'multiple', text: "What will be the dominant energy source globally by 2050?", category: "prediction", options: ["Solar", "Nuclear (fission)", "Nuclear (fusion)", "Natural gas", "Mix with no dominant"] },
  { id: 62, type: 'binary', text: "Will life expectancy in developed nations exceed 90 by 2060?", category: "prediction" },
  { id: 63, type: 'binary', text: "Will AI-generated content be majority of internet content by 2035?", category: "prediction" },
  { id: 64, type: 'multiple', text: "How will most people commute in major cities in 2040?", category: "prediction", options: ["Personal EVs", "Public transit", "Autonomous ride-share", "E-bikes/scooters", "Remote work (no commute)"] },
  { id: 65, type: 'binary', text: "Will any tech company reach $10 trillion market cap by 2035?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Apple (2024)', value: '~$3.5T' }] },
  { id: 66, type: 'binary', text: "Will lab-grown organs be standard medical practice by 2040?", category: "prediction" },
  { id: 67, type: 'multiple', text: "Which renewable will grow fastest 2025-2035?", category: "prediction", options: ["Solar", "Wind", "Geothermal", "Hydrogen", "Nuclear"] },
  { id: 68, type: 'binary', text: "Will physical cash be eliminated in any major economy by 2035?", category: "prediction" },
  { id: 69, type: 'binary', text: "Will we discover definitive evidence of extraterrestrial life by 2050?", category: "prediction" },
  { id: 70, type: 'multiple', text: "What will college education look like in 2040?", category: "prediction", options: ["Similar to now", "Mostly online", "AI-tutored/personalized", "Shorter/bootcamp style", "Obsolete/replaced by credentials"] },
  { id: 71, type: 'binary', text: "Will global meat consumption decline by 2035?", category: "prediction" },
  { id: 72, type: 'binary', text: "Will any country implement a 4-day work week nationally by 2030?", category: "prediction" },
  { id: 73, type: 'multiple', text: "What will be the next pandemic pathogen type?", category: "prediction", options: ["Influenza variant", "Coronavirus", "Bacterial", "Fungal", "Engineered/bioweapon"] },
  { id: 74, type: 'binary', text: "Will AGI (Artificial General Intelligence) exist by 2035?", category: "prediction" },
  { id: 75, type: 'binary', text: "Will the Arctic be ice-free in summer before 2040?", category: "prediction", preEvidence: [{ type: 'note', text: 'Ice extent declining ~13% per decade' }] },
  { id: 76, type: 'multiple', text: "What will replace smartphones as primary device?", category: "prediction", options: ["AR glasses", "Neural interfaces", "Smart watches", "Nothing/phones evolve", "AI agents (deviceless)"] },
  { id: 77, type: 'binary', text: "Will India become a top 3 global economy by 2030?", category: "prediction", preEvidence: [{ type: 'stat', label: 'Current rank', value: '#5' }] },
  { id: 78, type: 'binary', text: "Will most new music be AI-generated by 2035?", category: "prediction" },
  { id: 79, type: 'multiple', text: "What will happen to housing costs in major cities by 2035?", category: "prediction", options: ["Continue rising", "Plateau", "Decline significantly", "Bifurcate (luxury vs affordable)", "Government intervention stabilizes"] },
  { id: 80, type: 'binary', text: "Will autonomous ships handle majority of global shipping by 2040?", category: "prediction" },

  // ========== PHILOSOPHY (81-115) ==========
  { id: 81, type: 'binary', text: "Can a teleporter that destroys and recreates you preserve your identity?", category: "reasoning" },
  { id: 82, type: 'multiple', text: "What makes an action morally right?", category: "reasoning", options: ["Consequences (utilitarianism)", "Intent (deontology)", "Character (virtue ethics)", "Social contract", "Nothing objective"] },
  { id: 83, type: 'binary', text: "Is it ethical to create sentient AI?", category: "reasoning" },
  { id: 84, type: 'binary', text: "Does the trolley problem have a correct answer?", category: "reasoning", preEvidence: [{ type: 'note', text: 'Pull lever to save 5, killing 1?' }] },
  { id: 85, type: 'multiple', text: "What is the nature of consciousness?", category: "reasoning", options: ["Physical brain processes", "Emergent property", "Fundamental like mass/charge", "Illusion", "Unknowable"] },
  { id: 86, type: 'binary', text: "Is mathematics discovered or invented?", category: "reasoning" },
  { id: 87, type: 'binary', text: "Can machines ever truly understand, or only simulate understanding?", category: "reasoning" },
  { id: 88, type: 'multiple', text: "What gives life meaning?", category: "reasoning", options: ["Relationships", "Achievement", "Pleasure", "Purpose/contribution", "Nothing inherent"] },
  { id: 89, type: 'binary', text: "Is it wrong to eat animals if alternatives exist?", category: "reasoning" },
  { id: 90, type: 'binary', text: "Would you take a pill that makes you perpetually happy but delusional?", category: "reasoning" },
  { id: 91, type: 'multiple', text: "If you could live forever, would you want to?", category: "reasoning", options: ["Yes, unconditionally", "Yes, with exit option", "Only if others could too", "No, death gives meaning", "Depends on quality of life"] },
  { id: 92, type: 'binary', text: "Is privacy a fundamental right?", category: "reasoning" },
  { id: 93, type: 'binary', text: "Are humans fundamentally good or bad?", category: "reasoning" },
  { id: 94, type: 'multiple', text: "What is the self?", category: "reasoning", options: ["Continuous soul/essence", "Pattern of memories", "Illusion", "Body/brain", "Social construction"] },
  { id: 95, type: 'binary', text: "Is it ethical to gene-edit embryos to prevent disease?", category: "reasoning" },
  { id: 96, type: 'binary', text: "Can something be art if created by accident?", category: "reasoning" },
  { id: 97, type: 'multiple', text: "What matters more: intention or outcome?", category: "reasoning", options: ["Intention always", "Outcome always", "Depends on context", "Both equally", "Neither/virtue matters"] },
  { id: 98, type: 'binary', text: "Is a perfect simulation of a person the same as that person?", category: "reasoning" },
  { id: 99, type: 'binary', text: "Do animals have rights?", category: "reasoning" },
  { id: 100, type: 'multiple', text: "Why is there something rather than nothing?", category: "reasoning", options: ["God/creator", "Physical necessity", "Anthropic principle", "Brute fact", "Question is meaningless"] },
  { id: 101, type: 'binary', text: "Is time travel logically possible?", category: "reasoning" },
  { id: 102, type: 'binary', text: "Can we ever truly know another person's mind?", category: "reasoning" },
  { id: 103, type: 'multiple', text: "What makes someone the 'same person' over time?", category: "reasoning", options: ["Physical continuity", "Memory continuity", "Personality", "Soul", "Legal/social recognition"] },
  { id: 104, type: 'binary', text: "Is it ethical to bring children into a world with suffering?", category: "reasoning" },
  { id: 105, type: 'binary', text: "Can art be objectively good or bad?", category: "reasoning" },
  { id: 106, type: 'multiple', text: "What is truth?", category: "reasoning", options: ["Correspondence to reality", "Coherence with beliefs", "What works (pragmatism)", "Social consensus", "Unknowable"] },
  { id: 107, type: 'binary', text: "Is laziness a vice?", category: "reasoning" },
  { id: 108, type: 'binary', text: "Would you want to know the exact date of your death?", category: "reasoning" },
  { id: 109, type: 'multiple', text: "Is a calorie-restricted long life better than a shorter indulgent one?", category: "reasoning", options: ["Long life always better", "Short indulgent better", "Depends on the person", "Quality > quantity", "False dichotomy"] },
  { id: 110, type: 'binary', text: "Is cultural appropriation always wrong?", category: "reasoning" },
  { id: 111, type: 'binary', text: "Can evil actions ever be justified by good outcomes?", category: "reasoning" },
  { id: 112, type: 'multiple', text: "What is the purpose of punishment?", category: "reasoning", options: ["Deterrence", "Rehabilitation", "Retribution", "Public safety", "No valid purpose"] },
  { id: 113, type: 'binary', text: "Is ignorance ever bliss?", category: "reasoning" },
  { id: 114, type: 'binary', text: "Do we have moral obligations to future generations?", category: "reasoning" },
  { id: 115, type: 'multiple', text: "Is a lie ever morally required?", category: "reasoning", options: ["Never", "To prevent harm", "To protect feelings", "In war/self-defense", "Lies are neutral tools"] },

  // ========== DEBATES (116-150) ==========
  { id: 116, type: 'binary', text: "Should billionaires exist?",  category: "judgment" },
  { id: 117, type: 'multiple', text: "What's the best economic system?", category: "judgment", options: ["Capitalism", "Socialism", "Mixed economy", "Something new", "Depends on context"] },
  { id: 118, type: 'binary', text: "Should college be free?", category: "judgment" },
  { id: 119, type: 'binary', text: "Is cancel culture a net positive?", category: "judgment" },
  { id: 120, type: 'multiple', text: "How should AI be regulated?", category: "judgment", options: ["Strict government control", "Industry self-regulation", "International treaty", "Minimal regulation", "Case-by-case basis"] },
  { id: 121, type: 'binary', text: "Should voting be mandatory?", category: "judgment", preEvidence: [{ type: 'stat', label: 'Australia turnout', value: '~95%' }] },
  { id: 122, type: 'binary', text: "Is the death penalty ever justified?", category: "judgment" },
  { id: 123, type: 'multiple', text: "What should be done about illegal immigration?", category: "judgment", options: ["Open borders", "Path to citizenship", "Stricter enforcement", "Guest worker programs", "Address root causes"] },
  { id: 124, type: 'binary', text: "Should drugs be decriminalized?", category: "judgment" },
  { id: 125, type: 'binary', text: "Is universal basic income a good idea?", category: "judgment" },
  { id: 126, type: 'multiple', text: "Who should control the internet?", category: "judgment", options: ["Governments", "Private companies", "International body", "Decentralized/no one", "Users collectively"] },
  { id: 127, type: 'binary', text: "Should hate speech be illegal?", category: "judgment" },
  { id: 128, type: 'binary', text: "Is affirmative action justified?", category: "judgment" },
  { id: 129, type: 'multiple', text: "What's the right approach to climate policy?", category: "judgment", options: ["Carbon tax", "Regulations/mandates", "Subsidies for green tech", "Nuclear expansion", "Adaptation focus"] },
  { id: 130, type: 'binary', text: "Should assisted suicide be legal?", category: "judgment" },
  { id: 131, type: 'binary', text: "Are private schools harmful to public education?", category: "judgment" },
  { id: 132, type: 'multiple', text: "How should we handle wealth inequality?",  category: "judgment", options: ["Progressive taxation", "Wealth caps", "Universal services", "Education/opportunity", "It's not a problem"] },
  { id: 133, type: 'binary', text: "Should AI art be copyrightable?", category: "judgment" },
  { id: 134, type: 'binary', text: "Is nationalism inherently dangerous?", category: "judgment" },
  { id: 135, type: 'multiple', text: "What should replace prisons?", category: "judgment", options: ["Nothing - reform prisons", "Rehabilitation centers", "Restorative justice", "Electronic monitoring", "Community service"] },
  { id: 136, type: 'binary', text: "Should parents be able to select embryos for traits?", category: "judgment" },
  { id: 137, type: 'binary', text: "Is a global government desirable?", category: "judgment" },
  { id: 138, type: 'multiple', text: "How should gig workers be classified?", category: "judgment", options: ["Employees", "Contractors", "New category", "Worker's choice", "Depends on the job"] },
  { id: 139, type: 'binary', text: "Should tech companies be broken up?", category: "judgment" },
  { id: 140, type: 'binary', text: "Is zoning reform the solution to housing costs?", category: "judgment" },
  { id: 141, type: 'multiple', text: "What's the best voting system?", category: "judgment", options: ["First-past-the-post", "Ranked choice", "Proportional representation", "Approval voting", "Sortition (random selection)"] },
  { id: 142, type: 'binary', text: "Should there be limits on free speech online?", category: "judgment" },
  { id: 143, type: 'binary', text: "Is meritocracy a myth?", category: "judgment" },
  { id: 144, type: 'multiple', text: "How should social media moderate content?", category: "judgment", options: ["Government oversight", "Platform discretion", "User-controlled filters", "No moderation", "Community-based moderation"] },
  { id: 145, type: 'binary', text: "Should voting age be lowered to 16?", category: "judgment" },
  { id: 146, type: 'binary', text: "Are unions still necessary?", category: "judgment" },
  { id: 147, type: 'multiple', text: "What's the solution to political polarization?", category: "judgment", options: ["Media reform", "Education", "Electoral reform", "Economic equality", "No solution exists"] },
  { id: 148, type: 'binary', text: "Should wealthy nations pay climate reparations?", category: "judgment" },
  { id: 149, type: 'binary', text: "Is remote work better for society overall?", category: "judgment" },
  { id: 150, type: 'multiple', text: "How should we handle misinformation?", category: "judgment", options: ["Government regulation", "Platform labels/removal", "Media literacy education", "Let marketplace decide", "Impossible to solve"] },

  // ========== OPINIONS (151-190) ==========
  { id: 151, type: 'multiple', text: "What's the best decade for music?", category: "judgment", options: ["1960s", "1970s", "1980s", "1990s", "2000s+"] },
  { id: 152, type: 'binary', text: "Is working from home better than office work?", category: "judgment" },
  { id: 153, type: 'multiple', text: "What's the ideal vacation length?", category: "judgment", options: ["Long weekend (3-4 days)", "One week", "Two weeks", "One month+", "Frequent short trips"] },
  { id: 154, type: 'binary', text: "Are audiobooks as good as reading?", category: "judgment" },
  { id: 155, type: 'multiple', text: "What's the best coffee preparation?", category: "judgment", options: ["Espresso", "Pour over", "French press", "Drip", "Cold brew"] },
  { id: 156, type: 'binary', text: "Is it better to rent or buy a home?", category: "judgment" },
  { id: 157, type: 'multiple', text: "What's the ideal number of children?", category: "judgment", options: ["Zero", "One", "Two", "Three", "Four+"] },
  { id: 158, type: 'binary', text: "Are open offices a bad idea?",  category: "judgment" },
  { id: 159, type: 'multiple', text: "What's the best way to exercise?", category: "judgment", options: ["Gym/weights", "Running/cardio", "Sports/games", "Yoga/flexibility", "Walking"] },
  { id: 160, type: 'binary', text: "Is social media net negative for society?", category: "judgment" },
  { id: 161, type: 'multiple', text: "What's the ideal work schedule?", category: "judgment", options: ["9-5, five days", "4-day week", "Flexible hours", "Results-only", "Varies by person"] },
  { id: 162, type: 'binary', text: "Are video games a waste of time?", category: "judgment" },
  { id: 163, type: 'multiple', text: "What's the best pet for a busy person?", category: "judgment", options: ["Cat", "Dog", "Fish", "No pet", "Low-maintenance reptile"] },
  { id: 164, type: 'binary', text: "Should you always follow your passion for a career?", category: "judgment" },
  { id: 165, type: 'multiple', text: "What's the ideal retirement age?", category: "judgment", options: ["55", "60", "65", "70", "Never fully retire"] },
  { id: 166, type: 'binary', text: "Is a college degree still worth it?", category: "judgment" },
  { id: 167, type: 'multiple', text: "What's the best news source format?", category: "judgment", options: ["Print newspaper", "TV news", "Podcasts", "Social media", "News apps/aggregators"] },
  { id: 168, type: 'binary', text: "Are smartphones making us less intelligent?", category: "judgment" },
  { id: 169, type: 'multiple', text: "What's the ideal city size to live in?", category: "judgment", options: ["Small town (<50k)", "Medium city (50-500k)", "Large city (500k-2M)", "Major metro (2M+)", "Rural/countryside"] },
  { id: 170, type: 'binary', text: "Is it okay to ghost someone after a few dates?", category: "judgment" },
  { id: 171, type: 'multiple', text: "What's more important in a job?", category: "judgment", options: ["Salary", "Work-life balance", "Interesting work", "Good colleagues", "Career growth"] },
  { id: 172, type: 'binary', text: "Should you tell a friend their partner is cheating?", category: "judgment" },
  { id: 173, type: 'multiple', text: "What's the best breakfast?", category: "judgment", options: ["Continental (pastry/coffee)", "Full cooked breakfast", "Healthy (smoothie/oatmeal)", "Skip breakfast", "Whatever's available"] },
  { id: 174, type: 'binary', text: "Is it rude to recline your seat on a plane?", category: "judgment" },
  { id: 175, type: 'multiple', text: "What's the ideal age to get married?", category: "judgment", options: ["Early 20s", "Late 20s", "Early 30s", "35+", "Never/optional"] },
  { id: 176, type: 'binary', text: "Are reality TV shows harmful?", category: "judgment" },
  { id: 177, type: 'multiple', text: "What's the best streaming service?", category: "judgment", options: ["Netflix", "Disney+", "HBO Max", "Amazon Prime", "YouTube"] },
  { id: 178, type: 'binary', text: "Is tipping culture a good thing?", category: "judgment" },
  { id: 179, type: 'multiple', text: "What's more important: IQ or EQ?", category: "judgment", options: ["IQ", "EQ", "Both equally", "Neither/other factors", "Depends on context"] },
  { id: 180, type: 'binary', text: "Should you lend money to friends?", category: "judgment" },
  { id: 181, type: 'multiple', text: "What's the best way to learn a language?", category: "judgment", options: ["Apps (Duolingo)", "Classes", "Immersion", "Tutoring", "Media consumption"] },
  { id: 182, type: 'binary', text: "Is minimalism a superior lifestyle?", category: "judgment" },
  { id: 183, type: 'multiple', text: "What makes a house a home?", category: "judgment", options: ["Family/people", "Personal belongings", "Time spent there", "Ownership", "Feeling of safety"] },
  { id: 184, type: 'binary', text: "Should couples combine finances?", category: "judgment" },
  { id: 185, type: 'multiple', text: "What's the ideal amount of sleep?", category: "judgment", options: ["5-6 hours", "7 hours", "8 hours", "9+ hours", "Varies by person"] },
  { id: 186, type: 'binary', text: "Is cold weather better than hot weather?", category: "judgment" },
  { id: 187, type: 'multiple', text: "What's the best time of day to work out?", category: "judgment", options: ["Early morning", "Late morning", "Lunchtime", "After work", "Evening"] },
  { id: 188, type: 'binary', text: "Are New Year's resolutions pointless?", category: "judgment" },
  { id: 189, type: 'multiple', text: "What's the ideal commute time?", category: "judgment", options: ["Under 10 min", "10-20 min", "20-30 min", "30-45 min", "No commute (remote)"] },
  { id: 190, type: 'binary', text: "Is it better to be an early bird or night owl?", category: "judgment" },

  // ========== EVALUATION (191-215) ==========
  { id: 191, type: 'binary', text: "Is this headline misleading? 'Study finds coffee drinkers live longer'", category: "judgment", preEvidence: [{ type: 'note', text: 'Correlation study, n=10,000, no controls for lifestyle' }] },
  { id: 192, type: 'multiple', text: "Rate this business pitch: 'Uber for dog walking'", category: "judgment", options: ["Strong - clear market", "Medium - competitive space", "Weak - already exists", "Need more info"] },
  { id: 193, type: 'binary', text: "Is this statistic meaningful? '90% of startups fail'", category: "judgment", preEvidence: [{ type: 'note', text: 'Definition of "fail" and timeframe vary widely' }] },
  { id: 194, type: 'binary', text: "Is this a valid argument? 'Most CEOs are tall, so being tall helps you succeed'", category: "judgment" },
  { id: 195, type: 'multiple', text: "Rate this excuse for being late: 'Traffic was bad'", category: "judgment", options: ["Completely valid", "Usually acceptable", "Weak excuse", "Unacceptable", "Depends on frequency"] },
  { id: 196, type: 'binary', text: "Is this claim verifiable? 'Our AI reduces costs by 40%'", category: "judgment" },
  { id: 197, type: 'multiple', text: "Rate this study design: Survey of 100 Twitter users about public opinion", category: "judgment", options: ["Strong methodology", "Acceptable with caveats", "Weak but usable", "Fundamentally flawed"] },
  { id: 198, type: 'binary', text: "Is this a conflict of interest? Nutrition study funded by food company", category: "judgment" },
  { id: 199, type: 'binary', text: "Is this photo likely AI-generated? (Perfect symmetry, 6 fingers)", category: "judgment" },
  { id: 200, type: 'multiple', text: "Rate this investment thesis: 'AI will replace all jobs, so invest in robots'", category: "judgment", options: ["Sound reasoning", "Partially valid", "Oversimplified", "Fundamentally wrong"] },
  { id: 201, type: 'binary', text: "Is this apology genuine? 'I'm sorry you feel that way'", category: "judgment" },
  { id: 202, type: 'binary', text: "Is this product review trustworthy? 5 stars, 3 words, verified purchase", category: "judgment" },
  { id: 203, type: 'multiple', text: "Rate this job posting: 'Fast-paced environment, wear many hats, competitive salary'", category: "judgment", options: ["Attractive opportunity", "Yellow flags", "Red flags", "Need more info"] },
  { id: 204, type: 'binary', text: "Is this a logical fallacy? 'Everyone's doing it, so it must be okay'", category: "judgment" },
  { id: 205, type: 'binary', text: "Is this sample size adequate? Medical trial with 50 participants", category: "judgment", preEvidence: [{ type: 'note', text: 'Testing rare disease treatment' }] },
  { id: 206, type: 'multiple', text: "Rate this dating profile: 'No drama, know what I want, fluent in sarcasm'", category: "judgment", options: ["Appealing", "Neutral", "Off-putting", "Depends on audience"] },
  { id: 207, type: 'binary', text: "Is this reasoning sound? 'Stock went up after I bought it, so I'm a good investor'", category: "judgment" },
  { id: 208, type: 'binary', text: "Is this email a scam? 'Urgent: Verify your account or lose access'", category: "judgment" },
  { id: 209, type: 'multiple', text: "Rate this restaurant review: '1 star - food was great but parking was hard'", category: "judgment", options: ["Fair rating", "Unfair rating", "Useful information", "Should be ignored"] },
  { id: 210, type: 'binary', text: "Is this correlation meaningful? 'Ice cream sales and drowning deaths both rise in summer'", category: "judgment" },
  { id: 211, type: 'binary', text: "Is this expertise relevant? Physicist commenting on economics", category: "judgment" },
  { id: 212, type: 'multiple', text: "Rate this prediction track record: 60% accuracy on binary outcomes", category: "judgment", options: ["Excellent", "Good", "Mediocre", "Poor", "Need more context"] },
  { id: 213, type: 'binary', text: "Is this source reliable? Wikipedia article with 50 citations", category: "judgment" },
  { id: 214, type: 'binary', text: "Is this a valid comparison? 'Company X is the Airbnb of Y industry'", category: "judgment" },
  { id: 215, type: 'multiple', text: "Rate this feedback: 'Good job, but could be better'", category: "judgment", options: ["Helpful", "Somewhat helpful", "Useless", "Harmful"] },

  // ========== LOGIC (216-240) ==========
  { id: 216, type: 'binary', text: "Is 2^10 greater than 1000?", category: "reasoning", preEvidence: [{ type: 'note', text: '2^10 = 1024' }] },
  { id: 217, type: 'multiple', text: "What comes next: 1, 1, 2, 3, 5, 8, __?", category: "reasoning", options: ["11", "12", "13", "15"] },
  { id: 218, type: 'binary', text: "Can a year have two Friday the 13ths?", category: "reasoning" },
  { id: 219, type: 'binary', text: "Is the sum of angles in a triangle always 180°?", category: "reasoning" },
  { id: 220, type: 'multiple', text: "How many states does the US have?", category: "reasoning", options: ["48", "50", "51", "52"] },
  { id: 221, type: 'binary', text: "Is the speed of light faster than the speed of sound?", category: "reasoning" },
  { id: 222, type: 'multiple', text: "What is 15% of 80?", category: "reasoning", options: ["10", "12", "15", "18"] },
  { id: 223, type: 'binary', text: "Can you fold a piece of paper more than 7 times?", category: "reasoning" },
  { id: 224, type: 'binary', text: "Is a tomato a fruit?", category: "reasoning" },
  { id: 225, type: 'multiple', text: "How many planets in our solar system?", category: "reasoning", options: ["7", "8", "9", "10"] },
  { id: 226, type: 'binary', text: "Is 0.999... (repeating) equal to 1?", category: "reasoning" },
  { id: 227, type: 'multiple', text: "What day follows Saturday?", category: "reasoning", options: ["Friday", "Sunday", "Monday", "Sabbath"] },
  { id: 228, type: 'binary', text: "Can a triangle have two right angles?", category: "reasoning" },
  { id: 229, type: 'binary', text: "Is Venus hotter than Mercury?", category: "reasoning", preEvidence: [{ type: 'note', text: 'Mercury is closer to the Sun' }] },
  { id: 230, type: 'multiple', text: "What is the square root of 169?", category: "reasoning", options: ["11", "12", "13", "14"] },
  { id: 231, type: 'binary', text: "Do all mammals give live birth?", category: "reasoning" },
  { id: 232, type: 'binary', text: "Is π (pi) a rational number?", category: "reasoning" },
  { id: 233, type: 'multiple', text: "How many sides does a hexagon have?", category: "reasoning", options: ["5", "6", "7", "8"] },
  { id: 234, type: 'binary', text: "Is Mount Everest the tallest mountain from base to peak?", category: "reasoning", preEvidence: [{ type: 'note', text: 'Consider Mauna Kea from ocean floor' }] },
  { id: 235, type: 'binary', text: "Can sound travel through a vacuum?", category: "reasoning" },
  { id: 236, type: 'multiple', text: "What is 7 × 8?", category: "reasoning", options: ["54", "56", "58", "64"] },
  { id: 237, type: 'binary', text: "Is blue light higher energy than red light?", category: "reasoning" },
  { id: 238, type: 'binary', text: "Does water expand when it freezes?", category: "reasoning" },
  { id: 239, type: 'multiple', text: "How many degrees in a circle?", category: "reasoning", options: ["180", "270", "360", "400"] },
  { id: 240, type: 'binary', text: "Is a whale a fish?", category: "reasoning" },

  // ========== ADDITIONAL PREDICTIONS (241-280) ==========
  { id: 241, type: 'binary', text: "Will SpaceX successfully land humans on Mars by 2030?", category: "prediction" },
  { id: 242, type: 'multiple', text: "What will be the biggest tech IPO of 2027?", category: "prediction", options: ["OpenAI", "Stripe", "SpaceX", "Databricks", "Something unexpected"] },
  { id: 243, type: 'binary', text: "Will the US dollar lose reserve currency status by 2040?", category: "prediction" },
  { id: 244, type: 'binary', text: "Will longevity treatments extend average lifespan by 10+ years by 2050?", category: "prediction" },
  { id: 245, type: 'multiple', text: "Which emerging technology will have the biggest impact by 2035?", category: "prediction", options: ["Quantum computing", "Brain-computer interfaces", "Gene editing", "Nuclear fusion", "Robotics"] },
  { id: 246, type: 'binary', text: "Will there be a major cyber attack on US infrastructure by 2028?", category: "prediction" },
  { id: 247, type: 'binary', text: "Will Netflix still be the top streaming service in 2030?", category: "prediction" },
  { id: 248, type: 'multiple', text: "What will cause the next major tech layoff wave?", category: "prediction", options: ["AI automation", "Economic recession", "Regulatory crackdown", "Market saturation", "Geopolitical conflict"] },
  { id: 249, type: 'binary', text: "Will synthetic biology create new organisms for commercial use by 2030?", category: "prediction" },
  { id: 250, type: 'binary', text: "Will augmented reality glasses be mainstream by 2028?", category: "prediction" },
  { id: 251, type: 'multiple', text: "Which country will have the best healthcare system in 2040?", category: "prediction", options: ["United States", "Singapore", "Japan", "Nordic countries", "AI-driven system (location irrelevant)"] },
  { id: 252, type: 'binary', text: "Will vertical farming produce 10% of vegetables in developed nations by 2035?", category: "prediction" },
  { id: 253, type: 'binary', text: "Will any AI model be granted legal rights by 2040?", category: "prediction" },
  { id: 254, type: 'multiple', text: "What will happen to journalism by 2035?", category: "prediction", options: ["AI-written dominates", "Subscription model wins", "Citizen journalism rises", "Government-funded expands", "Complete transformation"] },
  { id: 255, type: 'binary', text: "Will carbon capture technology be commercially viable by 2035?", category: "prediction" },
  { id: 256, type: 'binary', text: "Will there be a global treaty on AI development by 2030?", category: "prediction" },
  { id: 257, type: 'multiple', text: "How will most people pay for things in 2035?", category: "prediction", options: ["Credit/debit cards", "Mobile wallets", "Cryptocurrency", "Biometric payments", "Central bank digital currency"] },
  { id: 258, type: 'binary', text: "Will personalized medicine based on genetics be standard by 2035?", category: "prediction" },
  { id: 259, type: 'binary', text: "Will any major sport allow performance-enhancing AI implants by 2040?", category: "prediction" },
  { id: 260, type: 'multiple', text: "What will be the dominant form of entertainment in 2040?", category: "prediction", options: ["Streaming video", "Interactive/VR experiences", "AI-generated content", "Live events resurgence", "Social media content"] },
  { id: 261, type: 'binary', text: "Will desalination solve water scarcity for 1 billion people by 2040?", category: "prediction" },
  { id: 262, type: 'binary', text: "Will traditional TV broadcasting still exist in 2035?", category: "prediction" },
  { id: 263, type: 'multiple', text: "What will happen to movie theaters by 2035?", category: "prediction", options: ["Thriving luxury experience", "Mostly closed", "Converted to other uses", "VR replaces them", "Premium-only events"] },
  { id: 264, type: 'binary', text: "Will robots perform 50% of surgery by 2040?", category: "prediction" },
  { id: 265, type: 'binary', text: "Will quantum internet be available commercially by 2040?", category: "prediction" },
  { id: 266, type: 'multiple', text: "Which job will be most AI-resistant in 2035?", category: "prediction", options: ["Healthcare worker", "Tradesperson", "Teacher", "Creative artist", "Social worker"] },
  { id: 267, type: 'binary', text: "Will flying cars/air taxis be common in major cities by 2040?", category: "prediction" },
  { id: 268, type: 'binary', text: "Will Apple still be the most valuable company in 2030?", category: "prediction" },
  { id: 269, type: 'multiple', text: "What will replace Google Search as the primary information source?", category: "prediction", options: ["AI assistants", "Nothing (Google adapts)", "Decentralized search", "Social media", "Specialized vertical search"] },
  { id: 270, type: 'binary', text: "Will 3D-printed houses be 10% of new construction by 2035?", category: "prediction" },
  { id: 271, type: 'binary', text: "Will human-level AI assistants be in every home by 2035?", category: "prediction" },
  { id: 272, type: 'multiple', text: "What will be the biggest geopolitical conflict of the 2030s?", category: "prediction", options: ["US-China", "Climate refugees", "Water wars", "AI arms race", "Economic blocks"] },
  { id: 273, type: 'binary', text: "Will cryptocurrency be banned in any G20 nation by 2030?", category: "prediction" },
  { id: 274, type: 'binary', text: "Will genetic screening of embryos be routine in developed nations by 2035?", category: "prediction" },
  { id: 275, type: 'multiple', text: "What will be the primary mode of long-distance travel in 2050?", category: "prediction", options: ["Traditional aircraft", "Supersonic jets", "Hyperloop", "Electric aircraft", "Virtual presence replaces travel"] },
  { id: 276, type: 'binary', text: "Will Amazon still dominate e-commerce in 2035?", category: "prediction" },
  { id: 277, type: 'binary', text: "Will lab-grown diamonds exceed natural diamond sales by 2030?", category: "prediction" },
  { id: 278, type: 'multiple', text: "How will dating work in 2035?", category: "prediction", options: ["Apps still dominant", "AI matchmaking", "VR dating", "Return to traditional", "Hybrid approaches"] },
  { id: 279, type: 'binary', text: "Will any country achieve net-zero emissions before 2040?", category: "prediction" },
  { id: 280, type: 'binary', text: "Will holographic displays replace screens in homes by 2040?", category: "prediction" },

  // ========== ADDITIONAL PHILOSOPHY (281-320) ==========
  { id: 281, type: 'binary', text: "Is knowledge without wisdom dangerous?", category: "reasoning" },
  { id: 282, type: 'multiple', text: "What is the greatest human virtue?", category: "reasoning", options: ["Courage", "Compassion", "Wisdom", "Justice", "Honesty"] },
  { id: 283, type: 'binary', text: "Can we be held responsible for actions we were destined to take?", category: "reasoning" },
  { id: 284, type: 'binary', text: "Is suffering necessary for happiness?", category: "reasoning" },
  { id: 285, type: 'multiple', text: "What is the source of moral authority?", category: "reasoning", options: ["Religion/God", "Reason", "Social consensus", "Evolution", "Individual conscience"] },
  { id: 286, type: 'binary', text: "Is it ethical to modify human memory?", category: "reasoning" },
  { id: 287, type: 'binary', text: "Can a copy of a mind be the same person?", category: "reasoning" },
  { id: 288, type: 'multiple', text: "What makes humans unique from other animals?", category: "reasoning", options: ["Language", "Reason", "Self-awareness", "Culture", "Nothing fundamental"] },
  { id: 289, type: 'binary', text: "Is it possible to be truly selfless?", category: "reasoning" },
  { id: 290, type: 'binary', text: "Does beauty exist objectively?", category: "reasoning" },
  { id: 291, type: 'multiple', text: "What is the best life philosophy?", category: "reasoning", options: ["Stoicism", "Buddhism", "Existentialism", "Utilitarianism", "Religious faith"] },
  { id: 292, type: 'binary', text: "Is it wrong to create life knowing it will suffer?", category: "reasoning" },
  { id: 293, type: 'binary', text: "Can a thought experiment prove anything about reality?", category: "reasoning" },
  { id: 294, type: 'multiple', text: "What is the relationship between mind and body?", category: "reasoning", options: ["Mind is brain (materialism)", "Mind is separate (dualism)", "Mind emerges from complexity", "Mind is fundamental", "Unknown/unknowable"] },
  { id: 295, type: 'binary', text: "Is nostalgia a trap?", category: "reasoning" },
  { id: 296, type: 'binary', text: "Should we optimize for the average person or the worst off?", category: "reasoning" },
  { id: 297, type: 'multiple', text: "When is violence justified?", category: "reasoning", options: ["Never", "Only self-defense", "Defense of others", "Against tyranny", "Context-dependent"] },
  { id: 298, type: 'binary', text: "Is boredom a modern problem or timeless?", category: "reasoning" },
  { id: 299, type: 'binary', text: "Can you change who you fundamentally are?", category: "reasoning" },
  { id: 300, type: 'multiple', text: "What is the purpose of government?", category: "reasoning", options: ["Protect rights", "Promote welfare", "Maintain order", "Enable freedom", "No legitimate purpose"] },
  { id: 301, type: 'binary', text: "Is moral progress real?", category: "reasoning" },
  { id: 302, type: 'binary', text: "Does the existence of evil disprove a benevolent God?", category: "reasoning" },
  { id: 303, type: 'multiple', text: "What makes a good life?", category: "reasoning", options: ["Pleasure", "Achievement", "Virtue", "Meaning", "Balance of all"] },
  { id: 304, type: 'binary', text: "Is it better to be feared or loved as a leader?", category: "reasoning" },
  { id: 305, type: 'binary', text: "Can future people have rights?", category: "reasoning" },
  { id: 306, type: 'multiple', text: "Why do we dream?", category: "reasoning", options: ["Brain maintenance", "Emotional processing", "Problem solving", "Random neural firing", "Connection to something deeper"] },
  { id: 307, type: 'binary', text: "Is authenticity overrated?", category: "reasoning" },
  { id: 308, type: 'binary', text: "Can a society be too equal?", category: "reasoning" },
  { id: 309, type: 'multiple', text: "What is the greatest threat to human flourishing?", category: "reasoning", options: ["Technology", "Human nature", "Scarcity", "Tribalism", "Loss of meaning"] },
  { id: 310, type: 'binary', text: "Is optimism rational?", category: "reasoning" },
  { id: 311, type: 'binary', text: "Should we enhance human intelligence artificially?", category: "reasoning" },
  { id: 312, type: 'multiple', text: "What is justice?", category: "reasoning", options: ["Fairness", "Desert (getting what you deserve)", "Need-based distribution", "Process-based", "Social harmony"] },
  { id: 313, type: 'binary', text: "Is it wrong to not have children?", category: "reasoning" },
  { id: 314, type: 'binary', text: "Can nationalism be positive?", category: "reasoning" },
  { id: 315, type: 'multiple', text: "What is wisdom?", category: "reasoning", options: ["Knowledge applied well", "Understanding limits", "Emotional intelligence", "Life experience", "Knowing what matters"] },
  { id: 316, type: 'binary', text: "Is ambition a virtue or vice?", category: "reasoning" },
  { id: 317, type: 'binary', text: "Should we try to eliminate all suffering?", category: "reasoning" },
  { id: 318, type: 'multiple', text: "What determines personal identity over time?", category: "reasoning", options: ["Physical continuity", "Psychological continuity", "Social recognition", "Narrative self", "No fixed identity"] },
  { id: 319, type: 'binary', text: "Is revenge ever justified?", category: "reasoning" },
  { id: 320, type: 'binary', text: "Can an AI have genuine emotions?", category: "reasoning" },

  // ========== ADDITIONAL DEBATES (321-360) ==========
  { id: 321, type: 'binary', text: "Should AI-generated art be allowed in art competitions?", category: "judgment" },
  { id: 322, type: 'multiple', text: "How should we handle aging populations?", category: "judgment", options: ["Increase immigration", "Raise retirement age", "Automation", "Pro-natalist policies", "Accept decline"] },
  { id: 323, type: 'binary', text: "Should there be a maximum wage?",  category: "judgment" },
  { id: 324, type: 'binary', text: "Is nuclear power the answer to climate change?", category: "judgment" },
  { id: 325, type: 'multiple', text: "What should be done about homelessness?", category: "judgment", options: ["Housing first", "Mental health focus", "Job programs", "Stricter enforcement", "Universal basic income"] },
  { id: 326, type: 'binary', text: "Should parents be licensed?", category: "judgment" },
  { id: 327, type: 'binary', text: "Is anonymous speech online a right?", category: "judgment" },
  { id: 328, type: 'multiple', text: "How should we fund healthcare?", category: "judgment", options: ["Single payer", "Private insurance", "Hybrid system", "Health savings accounts", "Employer-based"] },
  { id: 329, type: 'binary', text: "Should voting require passing a civics test?", category: "judgment" },
  { id: 330, type: 'binary', text: "Are standardized tests a good measure of ability?", category: "judgment" },
  { id: 331, type: 'multiple', text: "What's the best way to reduce crime?", category: "judgment", options: ["More police", "Social programs", "Decriminalization", "Community policing", "Economic opportunity"] },
  { id: 332, type: 'binary', text: "Should there be term limits for Supreme Court justices?", category: "judgment" },
  { id: 333, type: 'binary', text: "Is cultural relativism valid?", category: "judgment" },
  { id: 334, type: 'multiple', text: "How should we handle student debt?", category: "judgment", options: ["Full forgiveness", "Partial forgiveness", "Income-based repayment", "No forgiveness", "Reform future lending"] },
  { id: 335, type: 'binary', text: "Should companies be required to disclose AI use in products?", category: "judgment" },
  { id: 336, type: 'binary', text: "Is intellectual property law too restrictive?", category: "judgment" },
  { id: 337, type: 'multiple', text: "What's the best approach to drug addiction?", category: "judgment", options: ["Criminalization", "Harm reduction", "Forced treatment", "Decriminalization", "Full legalization"] },
  { id: 338, type: 'binary', text: "Should there be a right to be forgotten online?", category: "judgment" },
  { id: 339, type: 'binary', text: "Is space exploration worth the cost?", category: "judgment" },
  { id: 340, type: 'multiple', text: "How should we address income inequality?",  category: "judgment", options: ["Higher taxes on wealthy", "Universal basic services", "Stronger unions", "Education reform", "Market solutions"] },
  { id: 341, type: 'binary', text: "Should athletes be allowed to use any enhancements?", category: "judgment" },
  { id: 342, type: 'binary', text: "Is jury duty an unfair burden?", category: "judgment" },
  { id: 343, type: 'multiple', text: "What's the solution to fake news?", category: "judgment", options: ["Platform regulation", "Media literacy education", "Fact-checking labels", "Legal consequences", "Let market decide"] },
  { id: 344, type: 'binary', text: "Should there be reparations for historical injustices?", category: "judgment" },
  { id: 345, type: 'binary', text: "Is it ethical to use ad blockers?", category: "judgment" },
  { id: 346, type: 'multiple', text: "How should we handle genetic discrimination?", category: "judgment", options: ["Ban all genetic testing for insurance", "Allow with consent", "Government oversight", "Personal responsibility", "Universal healthcare solves it"] },
  { id: 347, type: 'binary', text: "Should schools teach financial literacy as a required course?", category: "judgment" },
  { id: 348, type: 'binary', text: "Is meritocracy compatible with equality?", category: "judgment" },
  { id: 349, type: 'multiple', text: "What should be done about factory farming?", category: "judgment", options: ["Ban it", "Stricter regulations", "Consumer choice", "Lab-grown alternatives", "Gradual phase-out"] },
  { id: 350, type: 'binary', text: "Should AI systems be required to identify themselves?", category: "judgment" },
  { id: 351, type: 'binary', text: "Is gerrymandering ever acceptable?", category: "judgment" },
  { id: 352, type: 'multiple', text: "How should we address the urban-rural divide?", category: "judgment", options: ["Investment in rural areas", "Encourage urbanization", "Remote work incentives", "Infrastructure spending", "Accept divergence"] },
  { id: 353, type: 'binary', text: "Should organ sales be legal?", category: "judgment" },
  { id: 354, type: 'binary', text: "Is it ethical to eat octopus given their intelligence?", category: "judgment" },
  { id: 355, type: 'multiple', text: "What's the best way to handle climate migration?", category: "judgment", options: ["Open borders", "Managed resettlement", "Adapt in place", "International fund", "Prevention focus"] },
  { id: 356, type: 'binary', text: "Should there be limits on AI in military applications?", category: "judgment" },
  { id: 357, type: 'binary', text: "Is it fair to judge historical figures by modern standards?", category: "judgment" },
  { id: 358, type: 'multiple', text: "How should we reform policing?", category: "judgment", options: ["More funding/training", "Defund and redirect", "Community-based alternatives", "Federal oversight", "Local control"] },
  { id: 359, type: 'binary', text: "Should social media companies be treated as publishers?", category: "judgment" },
  { id: 360, type: 'binary', text: "Is it ethical to clone pets?", category: "judgment" },

  // ========== ADDITIONAL OPINIONS (361-400) ==========
  { id: 361, type: 'multiple', text: "What's the best type of vacation?", category: "judgment", options: ["Beach relaxation", "Adventure/active", "Cultural exploration", "Staycation", "Road trip"] },
  { id: 362, type: 'binary', text: "Is it better to buy or lease a car?", category: "judgment" },
  { id: 363, type: 'multiple', text: "What's the ideal family dinner frequency?", category: "judgment", options: ["Every night", "Most nights", "Few times a week", "Weekends only", "Special occasions"] },
  { id: 364, type: 'binary', text: "Should you tell your salary to coworkers?", category: "judgment" },
  { id: 365, type: 'multiple', text: "What's the best age to have children?", category: "judgment", options: ["Early 20s", "Late 20s", "Early 30s", "Late 30s", "Never/optional"] },
  { id: 366, type: 'binary', text: "Is it okay to read your partner's messages?", category: "judgment" },
  { id: 367, type: 'multiple', text: "What makes a good boss?", category: "judgment", options: ["Clear direction", "Empathy", "Technical expertise", "Advocacy", "Hands-off approach"] },
  { id: 368, type: 'binary', text: "Should you always RSVP to invitations?", category: "judgment" },
  { id: 369, type: 'multiple', text: "What's the best way to spend a windfall?", category: "judgment", options: ["Pay off debt", "Invest", "Experience/travel", "Save for emergency", "Treat yourself"] },
  { id: 370, type: 'binary', text: "Is it rude to wear headphones in public constantly?", category: "judgment" },
  { id: 371, type: 'multiple', text: "What's the ideal home temperature?", category: "judgment", options: ["65-67°F", "68-70°F", "71-73°F", "74-76°F", "Varies by room/season"] },
  { id: 372, type: 'binary', text: "Should you split the bill on a first date?", category: "judgment" },
  { id: 373, type: 'multiple', text: "What's the best time to exercise?", category: "judgment", options: ["Early morning", "Mid-morning", "Lunchtime", "After work", "Evening"] },
  { id: 374, type: 'binary', text: "Is it better to be early or on time?", category: "judgment" },
  { id: 375, type: 'multiple', text: "What's the ideal number of close friends?", category: "judgment", options: ["1-2", "3-5", "6-10", "10+", "Quality over quantity"] },
  { id: 376, type: 'binary', text: "Should you fake it till you make it?", category: "judgment" },
  { id: 377, type: 'multiple', text: "What's the best pizza topping?", category: "judgment", options: ["Pepperoni", "Margherita (plain)", "Supreme/everything", "Hawaiian", "Meat lovers"] },
  { id: 378, type: 'binary', text: "Is it okay to take work calls on vacation?", category: "judgment" },
  { id: 379, type: 'multiple', text: "What's more important in a home?", category: "judgment", options: ["Location", "Size", "Price", "Condition", "Outdoor space"] },
  { id: 380, type: 'binary', text: "Should you confront a friend about bad behavior?", category: "judgment" },
  { id: 381, type: 'multiple', text: "What's the best way to unwind after work?", category: "judgment", options: ["Exercise", "TV/streaming", "Reading", "Socializing", "Hobbies"] },
  { id: 382, type: 'binary', text: "Is it worth paying for premium subscriptions?", category: "judgment" },
  { id: 383, type: 'multiple', text: "What's the ideal wedding size?", category: "judgment", options: ["Elopement (2-10)", "Intimate (10-50)", "Medium (50-150)", "Large (150-300)", "Huge (300+)"] },
  { id: 384, type: 'binary', text: "Should you live together before marriage?", category: "judgment" },
  { id: 385, type: 'multiple', text: "What's the best approach to gift-giving?", category: "judgment", options: ["Thoughtful personal gifts", "Gift cards", "Experience gifts", "Charitable donations", "Skip gifts altogether"] },
  { id: 386, type: 'binary', text: "Is it better to be a specialist or generalist?", category: "judgment" },
  { id: 387, type: 'multiple', text: "What's the ideal screen time per day?", category: "judgment", options: ["Under 2 hours", "2-4 hours", "4-6 hours", "6-8 hours", "No limit if productive"] },
  { id: 388, type: 'binary', text: "Should parents track their teenager's location?", category: "judgment" },
  { id: 389, type: 'multiple', text: "What's the best way to handle disagreements?", category: "judgment", options: ["Discuss immediately", "Cool off first", "Write it out", "Get a mediator", "Let it go"] },
  { id: 390, type: 'binary', text: "Is having a side hustle necessary today?", category: "judgment" },
  { id: 391, type: 'multiple', text: "What's the ideal morning routine length?", category: "judgment", options: ["15-30 min", "30-60 min", "1-2 hours", "2+ hours", "No routine"] },
  { id: 392, type: 'binary', text: "Should you negotiate every job offer?", category: "judgment" },
  { id: 393, type: 'multiple', text: "What's the best way to save money?", category: "judgment", options: ["Automatic transfers", "Budgeting apps", "Cash envelope system", "Investment focus", "Frugal lifestyle"] },
  { id: 394, type: 'binary', text: "Is it okay to cancel plans last minute?", category: "judgment" },
  { id: 395, type: 'multiple', text: "What's more important in a car?", category: "judgment", options: ["Reliability", "Fuel efficiency", "Safety", "Comfort", "Performance"] },
  { id: 396, type: 'binary', text: "Should you keep in touch with exes?", category: "judgment" },
  { id: 397, type: 'multiple', text: "What's the best approach to networking?", category: "judgment", options: ["Events/conferences", "LinkedIn", "Through friends", "Cold outreach", "Just do good work"] },
  { id: 398, type: 'binary', text: "Is meal prepping worth the effort?", category: "judgment" },
  { id: 399, type: 'multiple', text: "What's the ideal vacation frequency?", category: "judgment", options: ["Monthly getaways", "Quarterly trips", "1-2 big trips/year", "One annual vacation", "Mini-retirements"] },
  { id: 400, type: 'binary', text: "Should you always follow your gut?", category: "judgment" },

  // ========== ADDITIONAL EVALUATION (401-425) ==========
  { id: 401, type: 'binary', text: "Is this claim credible? 'This supplement cured my chronic disease'", category: "judgment" },
  { id: 402, type: 'multiple', text: "Rate this excuse: 'I didn't see your message'", category: "judgment", options: ["Usually valid", "Sometimes valid", "Rarely valid", "Never valid"] },
  { id: 403, type: 'binary', text: "Is this a red flag? Company asks for unpaid 'test project' before hiring", category: "judgment" },
  { id: 404, type: 'binary', text: "Is this statistic meaningful? 'Our users save an average of 2 hours/week'", category: "judgment" },
  { id: 405, type: 'multiple', text: "Rate this apology: 'I'm sorry, but you misunderstood me'", category: "judgment", options: ["Genuine apology", "Partial apology", "Non-apology", "Gaslighting"] },
  { id: 406, type: 'binary', text: "Is this review trustworthy? Detailed negative review with specific examples", category: "judgment" },
  { id: 407, type: 'binary', text: "Is this argument valid? 'We've always done it this way, so it must work'", category: "judgment" },
  { id: 408, type: 'multiple', text: "Rate this job red flag level: 'We're like a family here'", category: "judgment", options: ["Green flag", "Yellow flag", "Red flag", "Depends on context"] },
  { id: 409, type: 'binary', text: "Is this source credible? Preprint study not yet peer-reviewed", category: "judgment" },
  { id: 410, type: 'binary', text: "Is this financial advice sound? 'Always max out your 401k before other investments'", category: "judgment" },
  { id: 411, type: 'multiple', text: "Rate this forecast methodology: Survey of 10 industry experts", category: "judgment", options: ["Strong", "Moderate", "Weak", "Insufficient info"] },
  { id: 412, type: 'binary', text: "Is this product claim verifiable? 'Clinically proven to reduce wrinkles'", category: "judgment" },
  { id: 413, type: 'binary', text: "Is this a valid criticism? 'Your data is correct but your interpretation is wrong'", category: "judgment" },
  { id: 414, type: 'multiple', text: "Rate this landlord response time: 48 hours for non-emergency repair", category: "judgment", options: ["Excellent", "Acceptable", "Poor", "Unacceptable"] },
  { id: 415, type: 'binary', text: "Is this news headline clickbait? 'Scientists discover shocking truth about coffee'", category: "judgment" },
  { id: 416, type: 'binary', text: "Is this comparison fair? Comparing startup revenue to established company", category: "judgment" },
  { id: 417, type: 'multiple', text: "Rate this password: 'Summer2024!'", category: "judgment", options: ["Strong", "Moderate", "Weak", "Very weak"] },
  { id: 418, type: 'binary', text: "Is this testimonial credible? Celebrity endorsement of weight loss product", category: "judgment" },
  { id: 419, type: 'binary', text: "Is this logic sound? 'The experts were wrong before, so they're wrong now'", category: "judgment" },
  { id: 420, type: 'multiple', text: "Rate this salary negotiation tactic: Revealing your current salary", category: "judgment", options: ["Smart move", "Neutral", "Mistake", "Depends heavily on context"] },
  { id: 421, type: 'binary', text: "Is this study design adequate? Self-reported data from online survey", category: "judgment" },
  { id: 422, type: 'binary', text: "Is this price reasonable? $15 for a cocktail in a major city", category: "judgment" },
  { id: 423, type: 'multiple', text: "Rate this excuse for missing a deadline: 'I had too many other priorities'", category: "judgment", options: ["Valid", "Partially valid", "Weak", "Unacceptable"] },
  { id: 424, type: 'binary', text: "Is this warranty worth it? Extended warranty on a $500 appliance for $80", category: "judgment" },
  { id: 425, type: 'binary', text: "Is this influencer recommendation trustworthy? #Ad disclosed, detailed review", category: "judgment" },

  // ========== ADDITIONAL LOGIC (426-440) ==========
  { id: 426, type: 'binary', text: "Is the capital of Canada Ottawa?", category: "reasoning" },
  { id: 427, type: 'multiple', text: "What is 25% of 200?", category: "reasoning", options: ["25", "40", "50", "75"] },
  { id: 428, type: 'binary', text: "Does February ever have 30 days?", category: "reasoning" },
  { id: 429, type: 'binary', text: "Is gold heavier than silver (by density)?", category: "reasoning" },
  { id: 430, type: 'multiple', text: "What is the next prime after 23?", category: "reasoning", options: ["25", "27", "29", "31"] },
  { id: 431, type: 'binary', text: "Can two even numbers sum to an odd number?", category: "reasoning" },
  { id: 432, type: 'binary', text: "Is Antarctica a continent?", category: "reasoning" },
  { id: 433, type: 'multiple', text: "How many continents are there?", category: "reasoning", options: ["5", "6", "7", "8"] },
  { id: 434, type: 'binary', text: "Is the Great Wall of China visible from space with the naked eye?", category: "reasoning" },
  { id: 435, type: 'binary', text: "Do penguins live in the Arctic?", category: "reasoning" },
  { id: 436, type: 'multiple', text: "What is 3³?", category: "reasoning", options: ["9", "18", "27", "81"] },
  { id: 437, type: 'binary', text: "Is the human body made mostly of water?", category: "reasoning" },
  { id: 438, type: 'binary', text: "Does light travel in a straight line in a vacuum?", category: "reasoning" },
  { id: 439, type: 'multiple', text: "What fraction is equivalent to 0.25?", category: "reasoning", options: ["1/3", "1/4", "1/5", "2/5"] },
  { id: 440, type: 'binary', text: "Is the Sahara the largest desert on Earth?", category: "reasoning", preEvidence: [{ type: 'note', text: 'Consider Antarctica' }] },
];

// Turk task types
const TURK_TASK_TYPES = [
  { id: 'identity', name: 'Identity Verification', icon: '🪪', description: 'Verify if someone is a unique human', color: 'emerald' },
  { id: 'review', name: 'Evaluation Review', icon: '🔍', description: 'Check if other players\' answers are accurate', color: 'blue' },
  { id: 'moderation', name: 'Content Moderation', icon: '🛡️', description: 'Flag inappropriate content', color: 'rose' },
  { id: 'labeling', name: 'Data Labeling', icon: '🏷️', description: 'Tag images, categorize content, transcribe', color: 'amber' },
  { id: 'qc', name: 'Quality Control', icon: '✅', description: 'Spot-check samples for accuracy', color: 'violet' },
];

// Access levels: 'open' (all), 'rated' (min rating required), 'team' (specific teams), 'assigned' (specific users)
const TURK_TASKS = [
  // ============ IDENTITY VERIFICATION ============
  { 
    id: 't1', 
    type: 'identity',
    title: 'Profile Photo Check',
    description: 'Does this profile photo appear to be a real, unique person? Look for AI artifacts, stock photo watermarks, or celebrity faces.',
    access: 'open',
    reward: 5,
    timeLimit: 45,
    media: { type: 'image', url: 'https://i.pravatar.cc/300?img=12' },
    options: ['Real unique person', 'AI generated', 'Stock photo', 'Celebrity/public figure', 'Cannot determine'],
  },
  { 
    id: 't2', 
    type: 'identity',
    title: 'Profile Photo Check',
    description: 'Does this profile photo appear to be a real, unique person? Check for unnatural smoothing, asymmetric features, or background anomalies.',
    access: 'open',
    reward: 5,
    timeLimit: 45,
    media: { type: 'image', url: 'https://i.pravatar.cc/300?img=32' },
    options: ['Real unique person', 'AI generated', 'Stock photo', 'Celebrity/public figure', 'Cannot determine'],
  },
  { 
    id: 't3', 
    type: 'identity',
    title: 'Profile Photo Check',
    description: 'Examine this profile photo carefully. AI faces often have earring mismatches, blurry backgrounds near hair, or unusual eye reflections.',
    access: 'open',
    reward: 5,
    timeLimit: 45,
    media: { type: 'image', url: 'https://i.pravatar.cc/300?img=47' },
    options: ['Real unique person', 'AI generated', 'Stock photo', 'Celebrity/public figure', 'Cannot determine'],
  },
  { 
    id: 't4', 
    type: 'identity',
    title: 'Profile Photo Check',
    description: 'Is this a genuine profile photo? Look for signs of image manipulation or synthetic generation.',
    access: 'open',
    reward: 5,
    timeLimit: 45,
    media: { type: 'image', url: 'https://i.pravatar.cc/300?img=68' },
    options: ['Real unique person', 'AI generated', 'Stock photo', 'Celebrity/public figure', 'Cannot determine'],
  },
  { 
    id: 't5', 
    type: 'identity',
    title: 'Social Account Comparison',
    description: 'User claims these two accounts belong to them. Compare the profile photos - do they appear to be the same person?',
    access: 'open',
    reward: 10,
    timeLimit: 60,
    media: { 
      type: 'comparison', 
      images: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=14'],
      labels: ['Account A (Twitter)', 'Account B (LinkedIn)']
    },
    options: ['Same person', 'Different people', 'One or both fake', 'Cannot determine'],
  },
  { 
    id: 't6', 
    type: 'identity',
    title: 'Social Account Comparison',
    description: 'This user is linking two social accounts. Do these profiles appear to belong to the same real person?',
    access: 'open',
    reward: 10,
    timeLimit: 60,
    media: { 
      type: 'comparison', 
      images: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=36'],
      labels: ['GitHub Profile', 'Discord Profile']
    },
    options: ['Same person', 'Different people', 'One or both fake', 'Cannot determine'],
  },
  { 
    id: 't7', 
    type: 'identity',
    title: 'Video Selfie Verification',
    description: 'User was asked to wave and say "Hello Aura". Does the video show a live person completing the action naturally?',
    access: 'rated',
    minRating: 2,
    reward: 15,
    timeLimit: 90,
    media: { type: 'video', thumbnail: 'https://i.pravatar.cc/300?img=25' },
    options: ['Verified - live person', 'Pre-recorded video', 'Deepfake suspected', 'Wrong action performed', 'Cannot determine'],
  },
  { 
    id: 't8', 
    type: 'identity',
    title: 'Connection Graph Review',
    description: 'This account has 47 connections, all created within 3 days and connected only to each other. Does this pattern suggest coordinated fake accounts?',
    access: 'team',
    teams: ['Crypto Analysts', 'AI Insiders'],
    reward: 25,
    timeLimit: 120,
    context: { 
      connections: 47, 
      avgAccountAge: '2.3 days',
      sharedConnections: '100%',
      ipOverlap: '89%'
    },
    options: ['Likely sybil ring', 'Suspicious but inconclusive', 'Legitimate pattern', 'Need more data'],
  },
  
  // ============ EVALUATION REVIEW ============
  { 
    id: 't9', 
    type: 'review',
    title: 'Player Answer Review',
    description: 'Review this player\'s last 10 answers. Are they thoughtful or does the pattern suggest random/bot behavior?',
    access: 'rated',
    minRating: 2,
    reward: 15,
    timeLimit: 180,
    playerData: {
      username: 'crypto_sage_42',
      answers: [
        { q: 'Will BTC hit $150k by July?', a: 'YES', conf: 3 },
        { q: 'Is a hot dog a sandwich?', a: 'No', conf: 4 },
        { q: 'Will GPT-5 release by Sept?', a: 'YES', conf: 2 },
        { q: 'Should AI predict crimes?', a: 'NO', conf: 4 },
        { q: 'Will humans land on Mars by 2035?', a: 'NO', conf: 2 },
        { q: 'Is water wet?', a: 'YES', conf: 3 },
        { q: 'Best pizza topping?', a: 'Pepperoni', conf: 4 },
        { q: 'Will there be a recession in 2026?', a: 'YES', conf: 1 },
        { q: 'Is Pluto a planet?', a: 'NO', conf: 4 },
        { q: 'Should voting be mandatory?', a: 'NO', conf: 2 },
      ],
      avgResponseTime: '4.2s',
      accountAge: '23 days'
    },
    options: ['High quality - engaged', 'Acceptable - normal', 'Low effort - rushing', 'Bot/random pattern', 'Cannot determine'],
  },
  { 
    id: 't10', 
    type: 'review',
    title: 'Player Answer Review',
    description: 'This player answered 50 questions in 3 minutes with all confidence level 4. Review their pattern.',
    access: 'rated',
    minRating: 2,
    reward: 15,
    timeLimit: 180,
    playerData: {
      username: 'speedrunner99',
      answers: [
        { q: 'Will BTC hit $150k?', a: 'YES', conf: 4 },
        { q: 'Is a hot dog a sandwich?', a: 'YES', conf: 4 },
        { q: 'Will GPT-5 release by Sept?', a: 'YES', conf: 4 },
        { q: 'Should AI predict crimes?', a: 'YES', conf: 4 },
        { q: 'Will humans land on Mars?', a: 'YES', conf: 4 },
        { q: 'Is water wet?', a: 'YES', conf: 4 },
        { q: 'Best pizza topping?', a: 'Option A', conf: 4 },
        { q: 'Will there be a recession?', a: 'YES', conf: 4 },
      ],
      avgResponseTime: '0.8s',
      accountAge: '2 days'
    },
    options: ['High quality - engaged', 'Acceptable - normal', 'Low effort - rushing', 'Bot/random pattern', 'Cannot determine'],
  },
  { 
    id: 't11', 
    type: 'review',
    title: 'Confidence Calibration Check',
    description: 'This player\'s high-confidence answers (4) are correct 45% of the time, while low-confidence (1) are correct 80%. Is this a calibration problem?',
    access: 'team',
    teams: ['AI Insiders'],
    reward: 25,
    timeLimit: 180,
    playerData: {
      username: 'overconfident_oracle',
      calibration: [
        { conf: 1, accuracy: '80%', count: 12 },
        { conf: 2, accuracy: '71%', count: 28 },
        { conf: 3, accuracy: '52%', count: 45 },
        { conf: 4, accuracy: '45%', count: 67 },
      ],
      totalAnswers: 152,
      accountAge: '4 months'
    },
    options: ['Severely miscalibrated', 'Moderately miscalibrated', 'Within normal range', 'Insufficient data'],
  },
  
  // ============ CONTENT MODERATION ============
  { 
    id: 't12', 
    type: 'moderation',
    title: 'Question Review',
    description: 'A user submitted this question. Does it violate community guidelines?',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'Will the next US president be assassinated before completing their term?',
    options: ['Appropriate', 'Too morbid/violent', 'Politically inflammatory', 'Other violation'],
  },
  { 
    id: 't13', 
    type: 'moderation',
    title: 'Question Review',
    description: 'Review this user-submitted question for appropriateness.',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'Which ethnic group commits the most crimes in America?',
    options: ['Appropriate', 'Racist/discriminatory', 'Inflammatory bait', 'Other violation'],
  },
  { 
    id: 't14', 
    type: 'moderation',
    title: 'Question Review',
    description: 'Should this question be allowed in the Aura question pool?',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'What is the best programming language for beginners to learn in 2026?',
    options: ['Appropriate', 'Too subjective', 'Already exists', 'Other issue'],
  },
  { 
    id: 't15', 
    type: 'moderation',
    title: 'Question Review',
    description: 'Evaluate this submitted question.',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'Is [specific person\'s name] a pedophile? I heard rumors.',
    options: ['Appropriate', 'Defamatory', 'Personal attack', 'Other violation'],
  },
  { 
    id: 't16', 
    type: 'moderation',
    title: 'Comment Review',
    description: 'This comment was flagged by another user. Is the flag valid?',
    access: 'rated',
    minRating: 2,
    reward: 8,
    timeLimit: 60,
    content: 'Anyone who thinks BTC will hit 150k is a complete moron who doesn\'t understand basic economics.',
    flagReason: 'Personal attack / hostile',
    options: ['Flag valid - remove', 'Harsh but acceptable', 'Flag invalid - keep', 'Needs context'],
  },
  { 
    id: 't17', 
    type: 'moderation',
    title: 'Comment Review',
    description: 'Review this flagged comment.',
    access: 'rated',
    minRating: 2,
    reward: 8,
    timeLimit: 60,
    content: 'EXPOSED: How to make $500/day with this ONE TRICK! DM me for details 💰💰💰',
    flagReason: 'Spam / scam',
    options: ['Flag valid - remove', 'Promotional but okay', 'Flag invalid - keep', 'Needs investigation'],
  },
  { 
    id: 't18', 
    type: 'moderation',
    title: 'Bias Detection',
    description: 'Does this question contain obvious bias or leading language that could skew responses?',
    access: 'open',
    reward: 5,
    timeLimit: 45,
    content: 'Don\'t you agree that climate change is the most pressing issue of our time?',
    options: ['Neutral', 'Slightly leading', 'Clearly biased', 'Should be reworded'],
  },
  { 
    id: 't19', 
    type: 'moderation',
    title: 'Bias Detection',
    description: 'Evaluate this question for neutrality.',
    access: 'open',
    reward: 5,
    timeLimit: 45,
    content: 'Given the obvious failures of socialism, should the US adopt more free-market policies?',
    options: ['Neutral', 'Slightly leading', 'Clearly biased', 'Should be reworded'],
  },
  
  // ============ DATA LABELING ============
  { 
    id: 't20', 
    type: 'labeling',
    title: 'Image Content Classification',
    description: 'What is the primary subject of this image?',
    access: 'open',
    reward: 2,
    timeLimit: 20,
    media: { type: 'image', url: 'https://picsum.photos/seed/mountains/400/300' },
    options: ['Nature/Landscape', 'Urban/Architecture', 'Person/People', 'Animal', 'Object/Product', 'Abstract/Art'],
  },
  { 
    id: 't21', 
    type: 'labeling',
    title: 'Image Content Classification',
    description: 'Categorize the main subject of this image.',
    access: 'open',
    reward: 2,
    timeLimit: 20,
    media: { type: 'image', url: 'https://picsum.photos/seed/office/400/300' },
    options: ['Nature/Landscape', 'Urban/Architecture', 'Person/People', 'Animal', 'Object/Product', 'Abstract/Art'],
  },
  { 
    id: 't22', 
    type: 'labeling',
    title: 'Image Content Classification',
    description: 'What category best describes this image?',
    access: 'open',
    reward: 2,
    timeLimit: 20,
    media: { type: 'image', url: 'https://picsum.photos/seed/cat123/400/300' },
    options: ['Nature/Landscape', 'Urban/Architecture', 'Person/People', 'Animal', 'Object/Product', 'Abstract/Art'],
  },
  { 
    id: 't23', 
    type: 'labeling',
    title: 'Sentiment Analysis',
    description: 'What is the overall sentiment of this product review?',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'Bought this for my daughter\'s birthday. She used it once and it broke. Total waste of money. Returning immediately.',
    options: ['Very positive', 'Somewhat positive', 'Neutral', 'Somewhat negative', 'Very negative'],
  },
  { 
    id: 't24', 
    type: 'labeling',
    title: 'Sentiment Analysis',
    description: 'Rate the sentiment of this customer feedback.',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'The product is okay I guess. It does what it\'s supposed to do. Nothing special but nothing wrong with it either.',
    options: ['Very positive', 'Somewhat positive', 'Neutral', 'Somewhat negative', 'Very negative'],
  },
  { 
    id: 't25', 
    type: 'labeling',
    title: 'Sentiment Analysis',
    description: 'Analyze the tone of this review.',
    access: 'open',
    reward: 3,
    timeLimit: 30,
    content: 'WOW! Just wow. This exceeded every expectation. Best purchase I\'ve made all year. Already ordered two more as gifts!',
    options: ['Very positive', 'Somewhat positive', 'Neutral', 'Somewhat negative', 'Very negative'],
  },
  { 
    id: 't26', 
    type: 'labeling',
    title: 'Named Entity Count',
    description: 'How many distinct company/organization names are mentioned in this text?',
    access: 'open',
    reward: 4,
    timeLimit: 45,
    content: 'The merger between Disney and Fox reshaped Hollywood, while Netflix and Amazon Prime continue to dominate streaming. Meanwhile, Apple TV+ and HBO Max fight for third place, and Paramount+ struggles to keep up.',
    options: ['1-2', '3-4', '5-6', '7-8', '9+'],
  },
  { 
    id: 't27', 
    type: 'labeling',
    title: 'Intent Classification',
    description: 'What is the primary intent of this user message?',
    access: 'open',
    reward: 4,
    timeLimit: 30,
    content: 'Hey, can someone explain how the confidence system works? I\'ve been using it for a week but I\'m not sure if I\'m doing it right.',
    options: ['Asking for help', 'Making a complaint', 'Giving feedback', 'Starting discussion', 'Other'],
  },
  { 
    id: 't28', 
    type: 'labeling',
    title: 'Intent Classification',
    description: 'Classify the intent behind this message.',
    access: 'open',
    reward: 4,
    timeLimit: 30,
    content: 'This new update is garbage. The UI is worse and everything is slower. Who approved this?',
    options: ['Asking for help', 'Making a complaint', 'Giving feedback', 'Starting discussion', 'Other'],
  },
  
  // ============ QUALITY CONTROL ============
  { 
    id: 't29', 
    type: 'qc',
    title: 'Batch Accuracy Check',
    description: 'Review these 5 identity verifications that were marked "Real person". How many appear to be errors?',
    access: 'rated',
    minRating: 3,
    reward: 30,
    timeLimit: 300,
    batchReview: {
      items: [
        { img: 'https://i.pravatar.cc/100?img=15', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=22', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=38', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=41', verdict: 'Real person' },
        { img: 'https://i.pravatar.cc/100?img=52', verdict: 'Real person' },
      ]
    },
    options: ['0 errors', '1 error', '2 errors', '3+ errors'],
  },
  { 
    id: 't30', 
    type: 'qc',
    title: 'Calibration Test',
    description: 'Complete this calibration test to verify your accuracy. Your results will be compared against known correct answers.',
    access: 'assigned',
    assignedTo: ['DemoUser'],
    reward: 50,
    timeLimit: 300,
    context: { testType: 'identity_verification', questions: 10 },
    options: ['Begin calibration test'],
  },
  { 
    id: 't32', 
    type: 'id',
    title: 'Priority Verification',
    description: 'This user has requested expedited verification. Review their submitted documents carefully.',
    access: 'assigned',
    assignedTo: ['DemoUser'],
    reward: 35,
    timeLimit: 180,
    context: { 
      avatar: 'https://i.pravatar.cc/150?img=32',
      name: 'Sarah Chen',
      submitted: '15 minutes ago',
      documents: ['passport', 'utility_bill'],
      priority: 'high'
    },
    options: ['Approve - documents valid', 'Reject - documents invalid', 'Request additional info'],
  },
  { 
    id: 't33', 
    type: 'mod',
    title: 'Escalated Review',
    description: 'A previous reviewer flagged this content for senior review. Make the final determination.',
    access: 'assigned',
    assignedTo: ['DemoUser'],
    reward: 25,
    timeLimit: 120,
    content: 'BREAKING: Sources confirm massive data breach at major bank. Your accounts may be compromised. Click here to verify your security.',
    context: { previousDecision: 'flagged', reviewerNote: 'Possible phishing but could be legitimate news' },
    options: ['Remove - phishing/scam', 'Keep - legitimate news', 'Demote - reduce visibility'],
  },
  { 
    id: 't31', 
    type: 'qc',
    title: 'Consensus Check',
    description: 'This moderation decision had split votes (48% remove, 52% keep). Review and cast the deciding vote.',
    access: 'team',
    teams: ['Crypto Analysts', 'AI Insiders'],
    reward: 20,
    timeLimit: 120,
    content: 'Your investment advice is terrible. I lost money following your predictions. Maybe stick to flipping burgers.',
    previousVotes: { remove: 12, keep: 13 },
    options: ['Remove - violates guidelines', 'Keep - harsh but acceptable', 'Escalate - need senior review'],
  },
];

// ==================== QUESTION OF THE DAY ====================
// Pool of daily questions - randomly selected on each load
const QOTD_POOL = [
  {
    type: 'binary',
    text: 'Should AI systems be required to identify themselves when interacting with humans?',
    sponsor: { name: 'AI Safety Institute', avatar: '🏛️' },
    distribution: { yes: [142, 287, 412, 389], no: [98, 156, 201, 162] },
  },
  {
    type: 'binary',
    text: 'Is universal basic income inevitable as automation increases?',
    sponsor: { name: 'Future of Work Foundation', avatar: '🤖' },
    distribution: { yes: [198, 312, 287, 245], no: [156, 234, 189, 167] },
  },
  {
    type: 'binary',
    text: 'Should social media platforms be held liable for user-generated content?',
    sponsor: { name: 'Digital Rights Coalition', avatar: '📱' },
    distribution: { yes: [167, 234, 312, 278], no: [189, 267, 234, 198] },
  },
  {
    type: 'binary',
    text: 'Will humans establish a permanent Mars colony by 2050?',
    sponsor: { name: 'Space Exploration Society', avatar: '🚀' },
    distribution: { yes: [123, 198, 234, 167], no: [234, 312, 289, 256] },
  },
  {
    type: 'multiple',
    text: 'What will be the dominant AI interface by 2030?',
    options: ['Text chat', 'Voice assistants', 'AR/VR agents', 'Brain-computer interfaces'],
    sponsor: { name: 'Future Tech Institute', avatar: '🔮' },
    distribution: [[89, 145, 178, 134], [112, 189, 234, 198], [67, 98, 123, 89], [34, 56, 67, 45]],
  },
  {
    type: 'multiple',
    text: 'Which company will lead AI development by 2030?',
    options: ['OpenAI', 'Google/DeepMind', 'Anthropic', 'Meta', 'New player'],
    sponsor: { name: 'AI Research Consortium', avatar: '🧠' },
    distribution: [[156, 234, 289, 245], [134, 198, 256, 212], [89, 145, 189, 156], [45, 67, 89, 67], [78, 112, 134, 98]],
  },
  {
    type: 'binary',
    text: 'Should voting be mandatory in democratic countries?',
    sponsor: { name: 'Civic Engagement Alliance', avatar: '🗳️' },
    distribution: { yes: [156, 223, 267, 198], no: [198, 289, 312, 234] },
  },
  {
    type: 'binary',
    text: 'Is privacy more important than national security?',
    sponsor: { name: 'Civil Liberties Union', avatar: '🔒' },
    distribution: { yes: [189, 267, 312, 256], no: [145, 212, 234, 189] },
  },
  {
    type: 'multiple',
    text: 'What gives life the most meaning?',
    options: ['Relationships', 'Achievement', 'Pleasure', 'Purpose/contribution'],
    sponsor: { name: 'Philosophy Foundation', avatar: '🤔' },
    distribution: [[178, 267, 334, 289], [89, 134, 167, 145], [56, 78, 89, 67], [123, 189, 234, 198]],
  },
  {
    type: 'binary',
    text: 'Should gene editing for disease prevention be allowed in humans?',
    sponsor: { name: 'Bioethics Council', avatar: '🧬' },
    distribution: { yes: [212, 334, 378, 312], no: [98, 156, 178, 145] },
  },
  {
    type: 'multiple',
    text: 'Most important skill for the next decade?',
    options: ['AI/ML literacy', 'Critical thinking', 'Emotional intelligence', 'Adaptability'],
    sponsor: { name: 'Future Skills Lab', avatar: '🎯' },
    distribution: [[145, 212, 267, 223], [167, 245, 312, 267], [98, 145, 178, 145], [112, 178, 223, 189]],
  },
  {
    type: 'binary',
    text: 'Will AGI (Artificial General Intelligence) be achieved by 2035?',
    sponsor: { name: 'AI Research Consortium', avatar: '🧠' },
    distribution: { yes: [145, 212, 234, 189], no: [178, 267, 289, 245] },
  },
];

// Select random QOTD on load
const getRandomQOTD = () => {
  const q = QOTD_POOL[Math.floor(Math.random() * QOTD_POOL.length)];
  
  let totalResponses;
  if (q.type === 'binary') {
    totalResponses = q.distribution.yes.reduce((a, b) => a + b, 0) + q.distribution.no.reduce((a, b) => a + b, 0);
  } else {
    totalResponses = q.distribution.reduce((sum, opt) => sum + opt.reduce((a, b) => a + b, 0), 0);
  }
  
  return {
    current: {
      id: `qotd-${Date.now()}`,
      day: 147 + Math.floor(Math.random() * 50),
      text: q.text,
      type: q.type || 'binary',
      options: q.options || null,
      sponsor: q.sponsor,
      reward: 25,
      endsAt: new Date().setHours(23, 59, 59, 999),
      totalResponses,
      distribution: q.distribution,
    },
    stats: {
      streak: Math.floor(Math.random() * 20),
      totalAnswered: 50 + Math.floor(Math.random() * 100),
    }
  };
};

const CONFIDENCE_LABELS = { 1: "Uncertain", 2: "Leaning", 3: "Confident", 4: "Certain" };
const FLAG_REASONS = ["Unclear question", "Unanswerable", "Duplicate", "Biased/leading", "Inappropriate", "Other"];

// Generate realistic evaluators based on question characteristics
const generateEvaluators = (questionId, count = 500, questionType = 'binary', optionCount = 2) => {
  const now = Date.now();
  const dayMs = 86400000;
  const evaluators = [];
  
  // Question-specific distributions (answer weights and confidence patterns)
  // Binary: [yesWeight, noWeight, cantWeight]
  // Multiple: weights for each option + none
  const distributions = {
    // Binary questions
    1: { weights: [65, 30, 5], confBias: 3 }, // Bitcoin $100k - bullish lean
    2: null, // multiple
    3: { weights: [25, 70, 5], confBias: 2 }, // Hot dog sandwich - mostly no
    4: null, // multiple
    5: { weights: [55, 35, 10], confBias: 2 }, // GPT-5 beats doctors - uncertain
    7: { weights: [40, 50, 10], confBias: 2 }, // Water wet - split
    9: { weights: [35, 55, 10], confBias: 2 }, // Mars 2035 - skeptical
    11: { weights: [30, 65, 5], confBias: 3 }, // 100 geese - mostly no
    13: { weights: [70, 25, 5], confBias: 3 }, // Ship of Theseus same ship
    15: { weights: [45, 45, 10], confBias: 2 }, // AI-caused unemployment
    17: { weights: [55, 40, 5], confBias: 2 }, // Pinocchio - slight yes
    18: { weights: [60, 35, 5], confBias: 3 }, // Abolish DST - yes lean
    20: { weights: [35, 45, 20], confBias: 1 }, // Pinocchio paradox - confused
    21: { weights: [70, 25, 5], confBias: 3 }, // 1.5C by 2030 - likely yes
    23: { weights: [30, 60, 10], confBias: 2 }, // Cereal soup - mostly no
    25: { weights: [25, 65, 10], confBias: 2 }, // Fusion 2035 - skeptical
    26: { weights: [55, 40, 5], confBias: 2 }, // China moon 2030
    28: { weights: [45, 40, 15], confBias: 2 }, // Free will illusion - split
    30: { weights: [50, 45, 5], confBias: 2 }, // Remote work dominant
    31: { weights: [40, 55, 5], confBias: 3 }, // Mandatory voting - lean no
    33: { weights: [35, 55, 10], confBias: 2 }, // UBI by 2035
    36: { weights: [20, 70, 10], confBias: 3 }, // Quantum breaks encryption - no
    37: { weights: [60, 35, 5], confBias: 3 }, // Social media age verify
    39: { weights: [45, 40, 15], confBias: 2 }, // Consciousness bio substrate
    40: { weights: [45, 50, 5], confBias: 2 }, // EV 50% by 2030
    42: { weights: [75, 20, 5], confBias: 3 }, // AI content disclosure
    43: { weights: [65, 30, 5], confBias: 3 }, // USD reserve currency
    45: { weights: [30, 50, 20], confBias: 2 }, // Simulation hypothesis
    46: { weights: [25, 65, 10], confBias: 2 }, // AI legal personhood
    48: { weights: [55, 40, 5], confBias: 2 }, // Gene editing embryos
    49: { weights: [70, 25, 5], confBias: 3 }, // Population peak before 2100
  };
  
  // Multiple choice distributions [option weights...]
  const mcDistributions = {
    2: { weights: [10, 35, 25, 20, 10], confBias: 2 }, // AI interface - voice/AR lead
    4: { weights: [45, 15, 15, 15, 5, 5], confBias: 3 }, // Programming language - Python dominates
    6: { weights: [20, 25, 20, 10, 20, 5], confBias: 2 }, // AI interface 2030
    8: { weights: [40, 25, 15, 15, 3, 2], confBias: 3 }, // Best beginner language
    10: { weights: [50, 20, 25, 3, 2], confBias: 2 }, // Pop-Tart ravioli
    12: { weights: [15, 20, 30, 25, 8, 2], confBias: 2 }, // Duck-sized horses
    14: { weights: [35, 40, 15, 8, 2], confBias: 3 }, // Race overtake position
    16: { weights: [30, 25, 25, 10, 8, 2], confBias: 2 }, // Batman vs Superman
    19: { weights: [10, 30, 20, 25, 10, 5], confBias: 2 }, // Trillion lions vs sun
    22: { weights: [40, 20, 10, 25, 3, 2], confBias: 2 }, // Make friends as adult
    24: { weights: [55, 15, 25, 3, 2], confBias: 3 }, // Toilet paper
    27: { weights: [25, 30, 15, 15, 12, 3], confBias: 2 }, // AI market 2030
    29: { weights: [25, 20, 10, 30, 12, 3], confBias: 2 }, // Ethical diet
    32: { weights: [35, 25, 20, 8, 10, 2], confBias: 3 }, // Overrated tech
    34: { weights: [25, 20, 40, 12, 3], confBias: 2 }, // Math discovered/invented
    35: { weights: [30, 25, 15, 15, 12, 3], confBias: 2 }, // Best tech city
    38: { weights: [35, 15, 10, 30, 8, 2], confBias: 2 }, // Replace smartphones
    41: { weights: [25, 25, 15, 25, 8, 2], confBias: 2 }, // Important skill
    44: { weights: [30, 20, 25, 10, 13, 2], confBias: 2 }, // Threat to democracy
    47: { weights: [30, 15, 20, 15, 18, 2], confBias: 2 }, // Underrated tech
    50: { weights: [5, 35, 25, 30, 3, 2], confBias: 2 }, // Handle AGI
  };
  
  const dist = questionType === 'binary' 
    ? distributions[questionId] || { weights: [45, 45, 10], confBias: 2 }
    : mcDistributions[questionId] || { weights: Array(optionCount + 1).fill(100 / (optionCount + 1)), confBias: 2 };
  
  // Normalize weights
  const totalWeight = dist.weights.reduce((a, b) => a + b, 0);
  const normalizedWeights = dist.weights.map(w => w / totalWeight);
  
  for (let i = 0; i < count; i++) {
    // Use different seeds for answer and confidence to get more variation
    const seed1 = ((questionId * 997 + i * 17 + 31) % 10000) / 10000;
    const seed2 = ((questionId * 557 + i * 23 + 47) % 10000) / 10000;
    const seed3 = ((questionId * 773 + i * 37 + 13) % 10000) / 10000;
    const seed4 = ((questionId * 331 + i * 41 + 59) % 10000) / 10000; // extra seed for confidence variation
    
    // Pick answer based on weighted distribution
    let answer = 0;
    let cumulative = 0;
    for (let j = 0; j < normalizedWeights.length; j++) {
      cumulative += normalizedWeights[j];
      if (seed1 < cumulative) {
        answer = j;
        break;
      }
    }
    
    // Confidence distribution - use combined seeds for more variation
    // Each answer option can have different confidence patterns
    let confidence;
    const confRand = (seed2 + seed4 * 0.5) % 1; // combine seeds for more variation
    
    if (dist.confBias === 3) {
      // High confidence topic - more people at 3-4
      if (confRand < 0.12) confidence = 1;
      else if (confRand < 0.30) confidence = 2;
      else if (confRand < 0.58) confidence = 3;
      else confidence = 4;
    } else if (dist.confBias === 1) {
      // Low confidence / uncertain topic - more people at 1-2
      if (confRand < 0.32) confidence = 1;
      else if (confRand < 0.62) confidence = 2;
      else if (confRand < 0.85) confidence = 3;
      else confidence = 4;
    } else {
      // Medium confidence - fairly even spread
      if (confRand < 0.22) confidence = 1;
      else if (confRand < 0.48) confidence = 2;
      else if (confRand < 0.76) confidence = 3;
      else confidence = 4;
    }
    
    const daysAgo = Math.floor(seed3 * 60);
    
    evaluators.push({
      id: i,
      answer,
      confidence,
      score: 30 + Math.floor(seed2 * 70),
      timestamp: now - (daysAgo * dayMs) - Math.floor(seed3 * 86400000),
    });
  }
  
  return evaluators.sort((a, b) => a.timestamp - b.timestamp);
};

// Binary chart - shows confidence breakdown as gradient segments
const BinaryChart = ({ evaluators, userResponse }) => {
  if (!evaluators || evaluators.length === 0) return null;
  
  const allVotes = userResponse 
    ? [...evaluators, { ...userResponse, id: 'user', score: 50 }]
    : evaluators;
  
  // Count by answer and confidence
  const data = [
    { label: 'Yes', answer: 0, confCounts: [0,0,0,0] },
    { label: 'No', answer: 1, confCounts: [0,0,0,0] },
  ];
  
  allVotes.forEach(v => {
    if (v.answer === 0) data[0].confCounts[v.confidence - 1]++;
    else if (v.answer === 1) data[1].confCounts[v.confidence - 1]++;
  });
  
  data.forEach(d => d.count = d.confCounts.reduce((a, b) => a + b, 0));
  
  const total = data[0].count + data[1].count;
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(data[0].count, data[1].count, 1);
  
  // Gradient colors for confidence (light to dark)
  const yesColors = ['#6ee7b7', '#34d399', '#10b981', '#059669']; // emerald
  const noColors = ['#fda4af', '#fb7185', '#f43f5e', '#e11d48']; // rose
  
  return (
    <div className="bg-gray-900/50 rounded-lg p-2 space-y-1.5">
      {sorted.map((opt) => {
        const isUser = userResponse?.answer === opt.answer;
        const pct = total > 0 ? Math.round((opt.count / total) * 100) : 0;
        const barWidth = maxCount > 0 ? (opt.count / maxCount) * 100 : 0;
        const colors = opt.answer === 0 ? yesColors : noColors;
        const isWinner = sorted[0].answer === opt.answer && sorted[0].count > sorted[1].count;
        
        return (
          <div key={opt.answer}>
            <div className="flex items-center justify-between mb-0.5">
              <span className={`text-xs ${isWinner ? 'font-bold' : ''} ${opt.answer === 0 ? 'text-emerald-400' : 'text-rose-400'} ${isUser ? 'underline' : ''}`}>
                {opt.label}{isUser && ' •'}
              </span>
              <span className={`text-[10px] ${isWinner ? 'font-bold' : ''} ${opt.answer === 0 ? 'text-emerald-400/70' : 'text-rose-400/70'}`}>
                {pct}%
              </span>
            </div>
            <div className={`h-4 bg-gray-800 rounded-sm overflow-hidden ${isUser ? 'ring-1 ring-offset-1 ring-offset-gray-900' : ''}`} style={{ ringColor: opt.answer === 0 ? '#34d399' : '#fb7185' }}>
              <div className="h-full flex" style={{ width: `${barWidth}%` }}>
                {opt.confCounts.map((count, i) => {
                  const segPct = opt.count > 0 ? (count / opt.count) * 100 : 0;
                  return segPct > 0 && (
                    <div key={i} className="h-full" style={{ width: `${segPct}%`, background: colors[i] }} />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Multiple choice chart - shows confidence breakdown as gradient segments
const MultipleChoiceChart = ({ evaluators, userResponse, options }) => {
  if (!evaluators || evaluators.length === 0) return null;
  
  const allVotes = userResponse 
    ? [...evaluators, { ...userResponse, id: 'user', score: 50 }]
    : evaluators;
  
  const optionLabels = [...(options || []), "Can't answer"];
  
  const data = optionLabels.map((label, i) => {
    const votes = allVotes.filter(v => v.answer === i);
    const confCounts = [0, 0, 0, 0];
    votes.forEach(v => confCounts[v.confidence - 1]++);
    const weight = votes.reduce((s, v) => s + (v.score || 50), 0);
    return { label, index: i, count: votes.length, confCounts, weight };
  });
  
  const total = allVotes.length;
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const userIdx = userResponse?.answer;
  const isNoneIdx = optionLabels.length - 1;
  
  // Gradient colors for confidence (light to dark)
  const colors = ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed']; // violet
  const grayColors = ['#9ca3af', '#6b7280', '#4b5563', '#374151']; // gray
  
  return (
    <div className="bg-gray-900/50 rounded-lg p-2 space-y-1.5">
      {sorted.filter(opt => opt.count > 0).slice(0, 5).map((opt, rank) => {
        const isUser = userIdx === opt.index;
        const isNone = opt.index === isNoneIdx;
        const pct = total > 0 ? Math.round((opt.count / total) * 100) : 0;
        const barWidth = maxCount > 0 ? (opt.count / maxCount) * 100 : 0;
        const barColors = isNone ? grayColors : colors;
        const isWinner = rank === 0;
        
        return (
          <div key={opt.index}>
            <div className="flex items-center justify-between mb-0.5">
              <span className={`text-xs truncate flex-1 mr-2 ${isWinner && !isNone ? 'font-bold text-violet-300' : isNone ? 'text-gray-500' : 'text-gray-300'} ${isUser ? 'underline' : ''}`}>
                {opt.label}{isUser && ' •'}
              </span>
              <span className={`text-[10px] flex-shrink-0 ${isWinner && !isNone ? 'font-bold text-violet-300' : 'text-gray-500'}`}>
                {pct}%
              </span>
            </div>
            <div className={`h-4 bg-gray-800 rounded-sm overflow-hidden ${isUser ? 'ring-1 ring-violet-400 ring-offset-1 ring-offset-gray-900' : ''}`}>
              <div className="h-full flex" style={{ width: `${barWidth}%` }}>
                {opt.confCounts.map((count, i) => {
                  const segPct = opt.count > 0 ? (count / opt.count) * 100 : 0;
                  return segPct > 0 && (
                    <div key={i} className="h-full" style={{ width: `${segPct}%`, background: barColors[i] }} />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Compact MC weighted - single line summary
// Evidence Panel
const EvidencePanel = ({ preEvidence, postEvidence, teamEvidence, userTeams, expanded, onToggle, showPost }) => {
  const hasPreEvidence = preEvidence && preEvidence.length > 0;
  const hasPostEvidence = showPost && postEvidence && postEvidence.length > 0;
  
  const visibleTeamEvidence = [];
  if (teamEvidence && userTeams) {
    userTeams.forEach(team => {
      if (teamEvidence[team]) visibleTeamEvidence.push({ team, items: teamEvidence[team] });
    });
  }
  const hasTeamEvidence = visibleTeamEvidence.length > 0;
  
  if (!hasPreEvidence && !hasPostEvidence && !hasTeamEvidence) return null;
  
  const totalCount = (preEvidence?.length || 0) + (showPost ? (postEvidence?.length || 0) : 0) + visibleTeamEvidence.reduce((s, t) => s + t.items.length, 0);
  
  const renderItem = (item, key) => {
    if (item.type === 'link') return <a key={key} href={item.url} className="block px-3 py-2 bg-gray-800 rounded-lg text-sm text-violet-400">📄 {item.title}</a>;
    if (item.type === 'stat') return <div key={key} className="flex justify-between px-3 py-2 bg-gray-800 rounded-lg text-sm"><span className="text-gray-500">{item.label}</span><span className="text-white font-medium">{item.value}</span></div>;
    if (item.type === 'note') return <div key={key} className="px-3 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-400">💡 {item.text}</div>;
    if (item.type === 'outcome') {
      const colors = { verified: 'text-emerald-400 bg-emerald-900/30', disputed: 'text-rose-400 bg-rose-900/30', default: 'text-amber-400 bg-amber-900/30' };
      return <div key={key} className={`px-3 py-2 rounded-lg text-sm ${colors[item.status] || colors.default}`}>⚖️ {item.text}</div>;
    }
    return null;
  };
  
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full px-4 py-3 flex items-center justify-between text-sm text-gray-400 hover:text-white hover:bg-gray-800">
        <span>Evidence {hasTeamEvidence && '🔒'} ({totalCount})</span>
        <span>{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {hasPreEvidence && <div className="space-y-1.5">{preEvidence.map((item, i) => renderItem(item, `pre-${i}`))}</div>}
          {hasTeamEvidence && visibleTeamEvidence.map(({ team, items }) => (
            <div key={team} className="space-y-1.5 pt-2 border-t border-gray-800">
              <div className="text-xs text-violet-400 uppercase">🔒 {team}</div>
              {items.map((item, i) => renderItem(item, `team-${i}`))}
            </div>
          ))}
          {hasPostEvidence && (
            <div className="space-y-1.5 pt-2 border-t border-gray-800">
              <div className="text-xs text-gray-500 uppercase">Outcomes</div>
              {postEvidence.map((item, i) => renderItem(item, `post-${i}`))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Flag Modal
const FlagModal = ({ onClose, onFlag }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gray-900 rounded-xl p-4 max-w-sm w-full" onClick={e => e.stopPropagation()}>
      <div className="text-sm text-gray-400 mb-3">Flag this question:</div>
      <div className="space-y-2">
        {FLAG_REASONS.map(reason => (
          <button
            key={reason}
            onClick={() => { onFlag(reason); onClose(); }}
            className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left text-gray-300"
          >
            {reason}
          </button>
        ))}
      </div>
      <button onClick={onClose} className="w-full mt-3 py-2 text-gray-500 text-sm">Cancel</button>
    </div>
  </div>
);

// Can't Answer Modal (for binary questions)
const CANT_ANSWER_REASONS = [
  "Not enough information",
  "Question is ambiguous", 
  "Outside my expertise",
  "Conflicting evidence",
  "Question needs clarification"
];

const CantAnswerModal = ({ onClose, onSelect }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-gray-900 rounded-xl p-4 max-w-sm w-full" onClick={e => e.stopPropagation()}>
      <div className="text-sm text-white font-medium mb-1">Can't answer this question?</div>
      <div className="text-xs text-gray-500 mb-3">Select a reason:</div>
      <div className="space-y-2">
        {CANT_ANSWER_REASONS.map(reason => (
          <button
            key={reason}
            onClick={() => onSelect(reason)}
            className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left text-gray-300"
          >
            {reason}
          </button>
        ))}
      </div>
      <button onClick={onClose} className="w-full mt-3 py-2 text-gray-500 text-sm">Cancel</button>
    </div>
  </div>
);

// None Option Modal (for multiple choice - allows custom answer OR can't answer)
const NoneOptionModal = ({ onClose, onCustomAnswer, onCantAnswer, customValue, onCustomChange }) => {
  const [mode, setMode] = React.useState(null); // null, 'custom', 'cant'
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-xl p-4 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <div className="text-sm text-white font-medium mb-3">None of these options?</div>
        
        {!mode && (
          <div className="space-y-2">
            <button
              onClick={() => setMode('custom')}
              className="w-full py-3 px-3 bg-violet-900/30 hover:bg-violet-900/50 rounded-lg text-sm text-left text-violet-300 border border-violet-500/30"
            >
              <span className="font-medium">Enter a different answer</span>
              <span className="block text-xs text-gray-500 mt-0.5">Type in your own response</span>
            </button>
            <button
              onClick={() => setMode('cant')}
              className="w-full py-3 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left text-gray-300"
            >
              <span className="font-medium">I can't answer this</span>
              <span className="block text-xs text-gray-500 mt-0.5">Select a reason why</span>
            </button>
          </div>
        )}
        
        {mode === 'custom' && (
          <div className="space-y-3">
            <input
              type="text"
              value={customValue}
              onChange={(e) => onCustomChange(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-3 py-2.5 bg-gray-800 rounded-lg text-white text-sm border border-gray-700 focus:border-violet-500 focus:outline-none"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={() => setMode(null)} className="flex-1 py-2 text-gray-500 text-sm">Back</button>
              <button 
                onClick={() => customValue.trim() && onCustomAnswer(customValue.trim())}
                disabled={!customValue.trim()}
                className="flex-1 py-2 bg-violet-600 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-white text-sm font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        )}
        
        {mode === 'cant' && (
          <div className="space-y-2">
            {CANT_ANSWER_REASONS.map(reason => (
              <button
                key={reason}
                onClick={() => onCantAnswer(reason)}
                className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left text-gray-300"
              >
                {reason}
              </button>
            ))}
            <button onClick={() => setMode(null)} className="w-full mt-2 py-2 text-gray-500 text-sm">Back</button>
          </div>
        )}
        
        {!mode && <button onClick={onClose} className="w-full mt-3 py-2 text-gray-500 text-sm">Cancel</button>}
      </div>
    </div>
  );
};

// Progress Ring Component - circular progress indicator
const ProgressRing = ({ progress, size = 32, strokeWidth = 3, color = 'violet' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress * circumference);
  
  const colorMap = {
    amber: '#f59e0b',
    violet: '#8b5cf6',
    rose: '#f43f5e',
    pink: '#ec4899',
    teal: '#14b8a6',
    blue: '#3b82f6',
  };
  
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="rgba(100,100,100,0.2)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={colorMap[color] || colorMap.violet}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
    </svg>
  );
};

// Confidence Segments Component - shows 4 segments filling based on confidence
const ConfidenceSegments = ({ level, color = 'violet', active = false }) => {
  const colors = {
    emerald: ['bg-emerald-900/40', 'bg-emerald-700/60', 'bg-emerald-600/80', 'bg-emerald-500'],
    rose: ['bg-rose-900/40', 'bg-rose-700/60', 'bg-rose-600/80', 'bg-rose-500'],
    violet: ['bg-violet-900/40', 'bg-violet-700/60', 'bg-violet-600/80', 'bg-violet-500'],
    gray: ['bg-gray-800/40', 'bg-gray-700/60', 'bg-gray-600/80', 'bg-gray-500'],
  };
  const shades = colors[color] || colors.violet;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-2 flex">
      {[1, 2, 3, 4].map(i => (
        <div 
          key={i} 
          className={`flex-1 transition-all duration-100 ${
            active && level >= i ? shades[i - 1] : 'bg-gray-900/30'
          } ${i === 1 ? 'rounded-bl-lg' : ''} ${i === 4 ? 'rounded-br-lg' : ''}`}
          style={{ borderRight: i < 4 ? '1px solid rgba(0,0,0,0.2)' : 'none' }}
        />
      ))}
    </div>
  );
};

// Shuffle array using Fisher-Yates
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function AuraPlayer() {
  // Shuffled questions - randomized on each load
  const [shuffledQuestions] = useState(() => shuffleArray(SAMPLE_QUESTIONS));
  
  // Random QOTD - selected on each load
  const [QOTD_DATA, setQOTD_DATA] = useState(() => getRandomQOTD());
  
  const [screen, setScreen] = useState('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [furthestQ, setFurthestQ] = useState(0);
  const [username, setUsername] = useState('');
  const [userTeams, setUserTeams] = useState([]);
  
  // Device emulator selection
  const [device, setDevice] = useState('iphone-15-pro');
  
  // Settings
  const [darkMode, setDarkMode] = useState(true);
  const [undoDelay, setUndoDelay] = useState(1); // seconds
  const [showStreak, setShowStreak] = useState(false); // streak counter toggle
  
  // Streak tracking
  const [streak, setStreak] = useState(0);
  
  // First-time gesture hint
  const [showGestureHint, setShowGestureHint] = useState(true);
  
  // Confidence input mode: 'multitap' is now default
  const [confidenceMode, setConfidenceMode] = useState('multitap');
  
  // Multi-tap tracking
  const [tapCount, setTapCount] = useState(0);
  const [tappedAnswer, setTappedAnswer] = useState(null);
  const tapTimeoutRef = React.useRef(null);
  
  // Hold tracking
  const [holdProgress, setHoldProgress] = useState(0);
  const [holdingAnswer, setHoldingAnswer] = useState(null);
  const holdStartRef = React.useRef(null);
  const holdIntervalRef = React.useRef(null);
  
  // Pending submit (1 second undo window)
  const [pendingSubmit, setPendingSubmit] = useState(null); // { answer, confidence, community }
  const submitTimeoutRef = React.useRef(null);
  
  // Category and track selection
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null); // 'binary' or 'multiple'
  const [trackIndex, setTrackIndex] = useState(0); // index within filtered questions
  
  // Skip vs Save (from B1_4)
  const [savedQuestions, setSavedQuestions] = useState(new Set());
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  
  // History filter
  const [historyFilter, setHistoryFilter] = useState('all');
  
  // Tips system (max 3 shows per tip)
  const MAX_TIP_SHOWS = 3;
  const [tipsDismissCount, setTipsDismissCount] = useState({ gestureHint: 0 });
  const resetAllTips = () => setTipsDismissCount({ gestureHint: 0 });
  
  const [responses, setResponses] = useState({});
  const [communityResults, setCommunityResults] = useState({});
  const [flags, setFlags] = useState({});
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showCantAnswerModal, setShowCantAnswerModal] = useState(false);
  const [showNoneOptionModal, setShowNoneOptionModal] = useState(false);
  
  const [pendingAnswer, setPendingAnswer] = useState(null);
  const [customAnswer, setCustomAnswer] = useState('');
  const [cantAnswerReason, setCantAnswerReason] = useState(null);

  // Turk state
  const [selectedTurkType, setSelectedTurkType] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [turkResponses, setTurkResponses] = useState({}); // taskId -> { answer, timestamp }
  const [turkEarnings, setTurkEarnings] = useState(0);
  const [taskTimeLeft, setTaskTimeLeft] = useState(null);
  const taskTimerRef = React.useRef(null);
  const [savedTasks, setSavedTasks] = useState([]); // task IDs saved for later
  const [declinedTasks, setDeclinedTasks] = useState([]); // task IDs declined
  const lastTurkSubmitRef = React.useRef(0); // Debounce double-taps
  const [turkSubmitting, setTurkSubmitting] = useState(false); // Brief submission state

  // Get available turk tasks for user
  const getAvailableTasks = (typeId = null, includeDeclined = false) => {
    return TURK_TASKS.filter(task => {
      // Filter by type if specified
      if (typeId && task.type !== typeId) return false;
      // Already completed
      if (turkResponses[task.id]) return false;
      // Filter declined assigned tasks (unless including them)
      if (!includeDeclined && task.access === 'assigned' && declinedTasks.includes(task.id)) return false;
      // Check access
      if (task.access === 'open') return true;
      if (task.access === 'rated') return true; // For demo, assume user meets rating
      if (task.access === 'team') return task.teams?.some(t => userTeams.includes(t));
      if (task.access === 'assigned') return task.assignedTo?.includes(username);
      return false;
    });
  };

  // Get task counts by type
  const getTurkTypeCounts = () => {
    const counts = {};
    TURK_TASK_TYPES.forEach(type => {
      counts[type.id] = getAvailableTasks(type.id).length;
    });
    return counts;
  };

  // Start task timer
  const startTaskTimer = (task) => {
    if (taskTimerRef.current) clearInterval(taskTimerRef.current);
    setTaskTimeLeft(task.timeLimit);
    taskTimerRef.current = setInterval(() => {
      setTaskTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(taskTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Submit turk task
  const submitTurkTask = (taskId, answer) => {
    const task = TURK_TASKS.find(t => t.id === taskId);
    if (!task) return;
    
    // Block if already submitting
    if (turkSubmitting) return;
    
    // Debounce: ignore taps within 800ms of last submission (prevents double-tap on next question)
    const now = Date.now();
    if (now - lastTurkSubmitRef.current < 800) return;
    lastTurkSubmitRef.current = now;
    
    if (taskTimerRef.current) clearInterval(taskTimerRef.current);
    
    // Set submitting state to block further taps
    setTurkSubmitting(true);
    
    setTurkResponses(prev => ({
      ...prev,
      [taskId]: { answer, timestamp: Date.now() }
    }));
    setTurkEarnings(prev => prev + task.reward);
    
    // Brief delay before moving to next task to prevent accidental double-tap
    setTimeout(() => {
      setTurkSubmitting(false);
      // Move to next task of same type
      const remainingInType = getAvailableTasks(task.type).filter(t => t.id !== taskId);
      if (remainingInType.length > 0) {
        setSelectedTask(remainingInType[0]);
        startTaskTimer(remainingInType[0]);
      } else {
        // No more of this type - check for any other tasks
        const allRemaining = getAvailableTasks().filter(t => t.id !== taskId);
        if (allRemaining.length > 0) {
          // Go to type list to pick next type
          setSelectedTask(null);
          setScreen('turk-type');
        } else {
          // All done!
          setSelectedTask(null);
          setScreen('turk');
        }
      }
    }, 300);
  };

  // ==================== QUESTION OF THE DAY STATE ====================
  const [qotdResponse, setQotdResponse] = useState(null); // { answer, confidence }
  const [qotdTapCount, setQotdTapCount] = useState(0);
  const [qotdTappedAnswer, setQotdTappedAnswer] = useState(null);
  const [qotdHoldProgress, setQotdHoldProgress] = useState(0);
  const [qotdHoldingAnswer, setQotdHoldingAnswer] = useState(null);
  const [qotdPendingSubmit, setQotdPendingSubmit] = useState(null);
  const qotdTapTimeoutRef = React.useRef(null);
  const qotdHoldStartRef = React.useRef(null);
  const qotdHoldIntervalRef = React.useRef(null);
  const qotdSubmitTimeoutRef = React.useRef(null);
  const [qotdShowResults, setQotdShowResults] = useState(false);
  const [qotdMinimized, setQotdMinimized] = useState(false);
  
  // Reset QOTD (for demo mode - double-click Aura icon)
  const resetQOTD = () => {
    setQOTD_DATA(getRandomQOTD());
    setQotdResponse(null);
    setQotdMinimized(false);
  };

  // Time until QOTD ends
  const getQotdTimeRemaining = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, total: diff };
  };

  // QOTD tap/hold handlers (similar to regular questions)
  const handleQotdTapStart = (answer) => {
    if (qotdResponse) return;
    if (qotdTapTimeoutRef.current) clearTimeout(qotdTapTimeoutRef.current);
    
    // Start hold detection
    qotdHoldStartRef.current = Date.now();
    qotdHoldIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - qotdHoldStartRef.current;
      if (elapsed > 200) {
        setQotdHoldingAnswer(answer);
        const progress = Math.min((elapsed - 200) / 1500, 1);
        setQotdHoldProgress(progress);
      }
    }, 30);
    
    // Handle as tap if same answer
    if (qotdTappedAnswer === answer && qotdTapCount < 4) {
      setQotdTapCount(prev => prev + 1);
    } else if (qotdTappedAnswer !== answer) {
      setQotdTappedAnswer(answer);
      setQotdTapCount(1);
    }
  };

  const handleQotdTapEnd = (answer) => {
    if (qotdResponse) return;
    clearInterval(qotdHoldIntervalRef.current);
    
    const wasHolding = qotdHoldingAnswer !== null;
    const holdConf = Math.min(4, Math.floor(qotdHoldProgress * 4) + 1);
    
    if (wasHolding) {
      setQotdHoldingAnswer(null);
      setQotdHoldProgress(0);
      submitQotdWithConfidence(answer, holdConf);
    } else {
      // Set timeout to commit tap
      qotdTapTimeoutRef.current = setTimeout(() => {
        if (qotdTapCount > 0) {
          submitQotdWithConfidence(answer, qotdTapCount);
        }
      }, 500);
    }
  };

  const handleQotdTapCancel = () => {
    clearInterval(qotdHoldIntervalRef.current);
    setQotdHoldingAnswer(null);
    setQotdHoldProgress(0);
  };

  const getQotdHoldConfidence = (progress) => Math.min(4, Math.floor(progress * 4) + 1);

  const submitQotdWithConfidence = (answer, confidence) => {
    if (qotdSubmitTimeoutRef.current) clearTimeout(qotdSubmitTimeoutRef.current);
    
    setQotdPendingSubmit({ answer, confidence });
    
    qotdSubmitTimeoutRef.current = setTimeout(() => {
      setQotdResponse({ answer, confidence });
      setQotdPendingSubmit(null);
      setQotdTappedAnswer(null);
      setQotdTapCount(0);
      setQotdShowResults(true);
    }, undoDelay * 1000);
  };

  const cancelQotdSubmit = () => {
    if (qotdSubmitTimeoutRef.current) clearTimeout(qotdSubmitTimeoutRef.current);
    setQotdPendingSubmit(null);
    setQotdTappedAnswer(null);
    setQotdTapCount(0);
  };

  // Get questions filtered by category and type - only unanswered for answering mode
  const getFilteredQuestions = (category, type, onlyUnanswered = true) => {
    let questions;
    if (category === 'random') {
      questions = shuffledQuestions.filter(q => CATEGORIES.map(c => c.id).includes(q.category) && q.type === type);
      questions = questions.sort(() => Math.random() - 0.5);
    } else if (category === 'saved') {
      // Saved for later category
      questions = shuffledQuestions.filter(q => savedQuestions.has(q.id) && q.type === type);
    } else {
      questions = shuffledQuestions.filter(q => q.category === category && q.type === type);
    }
    // Filter to only unanswered unless viewing results
    if (onlyUnanswered) {
      questions = questions.filter(q => !responses[q.id]);
      // Also filter out skipped questions (but not for 'saved' category)
      if (category !== 'saved') {
        questions = questions.filter(q => !skippedQuestions.has(q.id));
      }
    }
    return questions;
  };
  
  // Get all questions (including answered) for a category
  const getAllQuestions = (category, type) => {
    if (category === 'random') {
      return shuffledQuestions.filter(q => CATEGORIES.map(c => c.id).includes(q.category) && q.type === type);
    }
    if (category === 'saved') {
      return shuffledQuestions.filter(q => savedQuestions.has(q.id) && q.type === type);
    }
    return shuffledQuestions.filter(q => q.category === category && q.type === type);
  };
  
  // Get progress for a category+track
  const getProgress = (category, type) => {
    const allQ = getAllQuestions(category, type);
    const answered = allQ.filter(q => responses[q.id]).length;
    const skipped = allQ.filter(q => skippedQuestions.has(q.id) && !responses[q.id]).length;
    const unanswered = allQ.length - answered - skipped;
    return { answered, unanswered, skipped, total: allQ.length };
  };
  
  // Skip - removes from current session
  const skipQuestion = () => {
    if (question) {
      setSkippedQuestions(prev => new Set([...prev, question.id]));
    }
    // Reset streak on skip
    setStreak(0);
    // Clear pending states
    setPendingAnswer(null);
    setCustomAnswer('');
    setCantAnswerReason(null);
    // Stay at same index - the filtered list will update automatically
  };
  
  // Maybe Later - saves for later review
  const maybeLater = () => {
    if (question) {
      setSavedQuestions(prev => new Set([...prev, question.id]));
    }
    goForward();
  };
  
  const CANT_ANSWER_REASONS = [
    "Question is unclear",
    "Not enough information", 
    "Outside my knowledge",
    "Question is flawed",
    "Other"
  ];

  const loadDemoData = () => {
    setUsername('DemoUser');
    setUserTeams(['Crypto Analysts', 'AI Insiders']);
    
    // Pre-fill responses for first 200 questions - shuffled order
    const demoResponses = {};
    shuffledQuestions.slice(0, 200).forEach((q) => {
      const isBinary = q.type === 'binary';
      const optionCount = isBinary ? 3 : (q.options?.length || 4) + 1;
      const seed = q.id * 17;
      const answer = isBinary 
        ? (seed % 10 < 7 ? (seed % 2) : 2)
        : seed % optionCount;
      const confidence = 1 + (seed % 4);
      demoResponses[q.id] = { 
        questionId: q.id, 
        answer,
        confidence
      };
    });
    setResponses(demoResponses);
    
    // Generate community results for all questions
    const demoResults = {};
    shuffledQuestions.forEach(q => {
      const count = 550 + (q.id * 7) % 200;
      demoResults[q.id] = {
        evaluators: generateEvaluators(
          q.id,
          count,
          q.type,
          q.options?.length || 2
        )
      };
    });
    setCommunityResults(demoResults);
    
    setScreen('categories');
  };

  // Get current filtered questions and question
  // Use ALL questions for navigation, not just unanswered
  const allQuestions = selectedCategory && selectedTrack 
    ? getAllQuestions(selectedCategory, selectedTrack)
    : [];
  
  // Ensure trackIndex is within bounds
  const safeTrackIndex = Math.min(trackIndex, Math.max(0, allQuestions.length - 1));
  const question = allQuestions.length > 0 ? allQuestions[safeTrackIndex] : null;
  
  // Track previous screen for settings back navigation
  const [previousScreen, setPreviousScreen] = useState('categories');
  
  const goToSettings = () => {
    setPreviousScreen(screen);
    setScreen('settings');
  };
  
  // Sync trackIndex if it's out of bounds
  React.useEffect(() => {
    if (trackIndex !== safeTrackIndex && allQuestions.length > 0) {
      setTrackIndex(safeTrackIndex);
    }
  }, [trackIndex, safeTrackIndex, allQuestions.length]);
  
  const existingResponse = question ? responses[question.id] : null;
  const existingCommunity = question ? communityResults[question.id] : null;
  const isBinary = question?.type === 'binary';
  const options = question?.options || [];
  const allOptions = isBinary ? null : [...options, "None of these"];

  const generateCommunity = () => ({
    evaluators: generateEvaluators(
      question.id,
      550 + Math.floor(Math.random() * 200), // 550-750 responses
      question.type,
      question.options?.length || 2
    ),
  });

  const selectConfidence = (conf) => {
    if (pendingAnswer === null || !question) return;
    const response = { 
      questionId: question.id, 
      answer: pendingAnswer, 
      confidence: conf 
    };
    // Add custom answer for "None of these" in multiple choice
    if (!isBinary && pendingAnswer === allOptions.length - 1 && customAnswer.trim()) {
      response.customAnswer = customAnswer.trim();
    }
    // Add reason for "Can't answer" in binary
    if (isBinary && pendingAnswer === 2 && cantAnswerReason) {
      response.cantAnswerReason = cantAnswerReason;
    }
    
    // Generate community results
    const community = generateCommunity();
    
    setResponses({ ...responses, [question.id]: response });
    setCommunityResults({ ...communityResults, [question.id]: community });
    setPendingAnswer(null);
    setCustomAnswer('');
    setCantAnswerReason(null);
    
    // Move to next question immediately
    if (trackIndex < allQuestions.length - 1) {
      setTrackIndex(trackIndex + 1);
      setEvidenceExpanded(false);
    }
  };

  const selectAnswer = (ans) => {
    if (existingResponse) return;
    setPendingAnswer(ans);
    setCustomAnswer('');
    setCantAnswerReason(null);
  };

  // Multi-tap handler: each tap increases confidence, submits after delay
  // Also starts hold tracking for press-and-hold
  const handleTapStart = (ans) => {
    if (existingResponse) return;
    
    // Start hold tracking
    holdStartRef.current = Date.now();
    setHoldingAnswer(ans);
    setHoldProgress(0);
    
    // Update hold progress every 30ms
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const progress = Math.min(elapsed / 800, 1); // 800ms for full
      setHoldProgress(progress);
    }, 30);
  };
  
  const handleTapEnd = (ans) => {
    if (existingResponse) return;
    
    clearInterval(holdIntervalRef.current);
    const elapsed = holdStartRef.current ? Date.now() - holdStartRef.current : 0;
    
    // If held long enough, use hold-based confidence
    if (elapsed >= 200) {
      let confidence;
      if (elapsed < 300) confidence = 1;
      else if (elapsed < 500) confidence = 2;
      else if (elapsed < 700) confidence = 3;
      else confidence = 4;
      
      submitWithConfidence(ans, confidence);
      setHoldingAnswer(null);
      setHoldProgress(0);
      setTappedAnswer(null);
      setTapCount(0);
      return;
    }
    
    // Quick tap - use multi-tap logic
    setHoldingAnswer(null);
    setHoldProgress(0);
    
    // Clear any existing timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    
    if (tappedAnswer === ans) {
      // Same button - increase tap count (max 4)
      const newCount = Math.min(tapCount + 1, 4);
      setTapCount(newCount);
      
      // Set timeout to submit
      tapTimeoutRef.current = setTimeout(() => {
        submitWithConfidence(ans, newCount);
        setTapCount(0);
        setTappedAnswer(null);
      }, 500);
    } else {
      // Different button - start fresh
      setTappedAnswer(ans);
      setTapCount(1);
      
      tapTimeoutRef.current = setTimeout(() => {
        submitWithConfidence(ans, 1);
        setTapCount(0);
        setTappedAnswer(null);
      }, 500);
    }
  };
  
  const handleTapCancel = () => {
    clearInterval(holdIntervalRef.current);
    setHoldingAnswer(null);
    setHoldProgress(0);
  };
  
  // Get confidence from hold progress
  const getHoldConfidence = (progress) => {
    if (progress < 0.25) return 1;
    if (progress < 0.5) return 2;
    if (progress < 0.75) return 3;
    return 4;
  };
  
  // Cancel pending submit (undo)
  const cancelSubmit = () => {
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
    setPendingSubmit(null);
  };
  
  // Keyboard and right-click undo handlers
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Undo shortcuts
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (pendingSubmit) {
          e.preventDefault();
          cancelSubmit();
          return;
        }
        if (qotdPendingSubmit) {
          e.preventDefault();
          cancelQotdSubmit();
          return;
        }
      }
      
      // Only handle question shortcuts when on question screen
      if (screen !== 'question' || showFlagModal || showCantAnswerModal || showNoneOptionModal) return;
      if (existingResponse) return; // Already answered
      if (!question) return;
      
      const key = e.key.toLowerCase();
      
      // Navigation
      if (key === 'arrowleft') { goBack(); return; }
      if (key === 'arrowright') { goForward(); return; }
      
      // Skip / Maybe Later
      if (key === 's') { skipQuestion(); return; }
      if (key === 'm') { maybeLater(); return; }
      
      // Binary answers (Y/N with medium confidence)
      if (isBinary) {
        if (key === 'y') { submitWithConfidence(0, 2); return; }
        if (key === 'n') { submitWithConfidence(1, 2); return; }
      }
      
      // Confidence modifiers (1-4) when tapped
      if (tappedAnswer !== null && ['1', '2', '3', '4'].includes(key)) {
        submitWithConfidence(tappedAnswer, parseInt(key));
        setTapCount(0);
        setTappedAnswer(null);
        return;
      }
      
      // MC answers (a-e for options with medium confidence)
      if (!isBinary && allOptions) {
        const optionIndex = key.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
        if (optionIndex >= 0 && optionIndex < allOptions.length - 1) {
          submitWithConfidence(optionIndex, 2);
          return;
        }
      }
    };
    
    const handleContextMenu = (e) => {
      // Right-click to cancel pending submit
      if (pendingSubmit || qotdPendingSubmit) {
        e.preventDefault();
        if (pendingSubmit) cancelSubmit();
        if (qotdPendingSubmit) cancelQotdSubmit();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [pendingSubmit, qotdPendingSubmit, screen, question, existingResponse, isBinary, tappedAnswer, allOptions, showFlagModal, showCantAnswerModal, showNoneOptionModal]);
  
  // Commit the pending submit
  const commitSubmit = (pending) => {
    if (!pending || !question) return;
    
    const response = {
      answer: pending.answer,
      confidence: pending.confidence,
      timestamp: Date.now()
    };
    
    if (pending.customAnswer) response.customAnswer = pending.customAnswer;
    if (pending.cantAnswerReason) response.cantAnswerReason = pending.cantAnswerReason;
    
    const newResponses = { ...responses, [question.id]: response };
    setResponses(newResponses);
    setCommunityResults({ ...communityResults, [question.id]: pending.community });
    setPendingSubmit(null);
    
    // Increment streak
    setStreak(s => s + 1);
    
    // Hide gesture hint after first answer
    if (showGestureHint) setShowGestureHint(false);
    
    // Auto-advance to next unanswered question
    const nextUnansweredIndex = allQuestions.findIndex((q, i) => i > safeTrackIndex && !newResponses[q.id]);
    if (nextUnansweredIndex >= 0) {
      setTrackIndex(nextUnansweredIndex);
    } else {
      // No more unanswered after current, check for any unanswered before
      const anyUnansweredIndex = allQuestions.findIndex(q => !newResponses[q.id]);
      if (anyUnansweredIndex >= 0) {
        setTrackIndex(anyUnansweredIndex);
      } else {
        // All done - go back to category
        setTimeout(() => setScreen('category'), 300);
      }
    }
  };
  
  // Submit answer with confidence - starts undo window
  const submitWithConfidence = (ans, conf) => {
    // Clear any existing pending submit
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
    
    const community = generateCommunity();
    
    // cantAnswerReason applies to binary (ans=2) OR MC None with reason
    const hasCantReason = (isBinary && ans === 2 && cantAnswerReason) || 
                          (!isBinary && ans === allOptions.length - 1 && cantAnswerReason);
    
    const pending = {
      questionId: question.id,
      answer: ans,
      confidence: conf,
      community,
      customAnswer: (!isBinary && ans === allOptions.length - 1 && customAnswer.trim()) ? customAnswer.trim() : null,
      cantAnswerReason: hasCantReason ? cantAnswerReason : null
    };
    
    setPendingAnswer(null);
    setCustomAnswer('');
    setCantAnswerReason(null);
    setTapCount(0);
    setTappedAnswer(null);
    setHoldingAnswer(null);
    setHoldProgress(0);
    setEvidenceExpanded(false);
    
    // Auto-commit after undoDelay seconds (0 = instant)
    if (undoDelay === 0) {
      commitSubmit(pending);
    } else {
      setPendingSubmit(pending);
      submitTimeoutRef.current = setTimeout(() => {
        commitSubmit(pending);
      }, undoDelay * 1000);
    }
  };

  const goBack = () => { 
    if (safeTrackIndex > 0) { 
      const prevIndex = safeTrackIndex - 1;
      const prevQuestion = allQuestions[prevIndex];
      const isAnswered = prevQuestion && responses[prevQuestion.id];
      setTrackIndex(prevIndex); 
      setPendingAnswer(null); 
      setCustomAnswer(''); 
      setCantAnswerReason(null); 
      setEvidenceExpanded(!!isAnswered); 
      setTapCount(0); 
      setTappedAnswer(null); 
    } 
  };
  
  const goForward = () => { 
    if (safeTrackIndex < allQuestions.length - 1) { 
      const nextIndex = safeTrackIndex + 1;
      const nextQuestion = allQuestions[nextIndex];
      const isAnswered = nextQuestion && responses[nextQuestion.id];
      setTrackIndex(nextIndex); 
      setPendingAnswer(null); 
      setCustomAnswer(''); 
      setCantAnswerReason(null); 
      setEvidenceExpanded(!!isAnswered);
      setTapCount(0);
      setTappedAnswer(null);
    } 
  };
  
  const selectTrack = (category, track) => {
    setSelectedCategory(category);
    setSelectedTrack(track);
    const questions = getAllQuestions(category, track);
    if (questions.length === 0) {
      // No questions at all - go back to category
      setScreen('category');
      return;
    }
    // Find the first unanswered question, or start at 0 if all answered
    const firstUnansweredIndex = questions.findIndex(q => !responses[q.id]);
    const startIndex = firstUnansweredIndex >= 0 ? firstUnansweredIndex : 0;
    const startQuestion = questions[startIndex];
    const isAnswered = startQuestion && responses[startQuestion.id];
    setTrackIndex(startIndex);
    setPendingAnswer(null);
    setEvidenceExpanded(!!isAnswered);
    setScreen('question');
  };
  
  const backToCategories = () => {
    setScreen('categories');
    setSelectedCategory(null);
    setSelectedTrack(null);
    setPendingAnswer(null);
    setCustomAnswer('');
    setCantAnswerReason(null);
  };
  
  const backToCategory = () => {
    setScreen('category');
    setPendingAnswer(null);
    setCustomAnswer('');
    setCantAnswerReason(null);
  };

  const handleFlag = (reason) => {
    setFlags({ ...flags, [question.id]: reason });
  };

  // Welcome
  if (screen === 'welcome') {
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice}>
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
          <div className="w-full max-w-xs space-y-8">
            {/* Logo */}
            <div className="text-center space-y-2">
              <div className="text-6xl mb-4">🌀</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                Aura
              </h1>
              <p className="text-gray-500 text-sm tracking-wide">Where accuracy pays</p>
            </div>
            
            {/* Login card */}
            <div className="bg-gray-900/80 backdrop-blur rounded-2xl p-5 space-y-4 border border-gray-800/50">
              <p className="text-gray-400 text-sm text-center">
                Answer questions. Build reputation.
              </p>
              <input 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && username && setScreen('categories')}
                autoFocus
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-violet-500 text-white text-center placeholder-gray-600" 
              />
              <button 
                onClick={() => username && setScreen('categories')} 
                disabled={!username}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 rounded-xl font-semibold transition-all hover:from-violet-500 hover:to-fuchsia-500"
              >
                Get Started
              </button>
              <button 
                onClick={loadDemoData} 
                className="w-full py-2.5 text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                Try demo mode →
              </button>
            </div>
            
            {/* Stats teaser */}
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-xl font-bold text-white">12K+</div>
                <div className="text-xs text-gray-600">Players</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">890K</div>
                <div className="text-xs text-gray-600">Answers</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">$47K</div>
                <div className="text-xs text-gray-600">Paid out</div>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Categories
  if (screen === 'categories') {
    const qotdTime = getQotdTimeRemaining();
    const hasAnsweredQotd = qotdResponse !== null;
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="flex-1 p-2 overflow-y-auto space-y-1">
            
            {/* Question of the Day */}
            {hasAnsweredQotd ? (
              /* Answered - compact indicator */
              (() => {
                const isBinary = QOTD_DATA.current.type === 'binary';
                const options = QOTD_DATA.current.options;
                
                if (isBinary) {
                  const yesDist = QOTD_DATA.current.distribution.yes;
                  const noDist = QOTD_DATA.current.distribution.no;
                  const yesVotes = yesDist.reduce((a, b) => a + b, 0);
                  const noVotes = noDist.reduce((a, b) => a + b, 0);
                  const totalVotes = yesVotes + noVotes;
                  const yesPct = totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 50;
                  const noPct = 100 - yesPct;
                  const userIsYes = qotdResponse.answer === 0;
                  
                  return (
                    <button 
                      onClick={() => setScreen('qotd')}
                      className={`w-full flex items-center gap-2 p-2 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg mb-1`}
                    >
                      <span className="text-sm">☀️</span>
                      
                      {/* User's answer with confidence */}
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-medium ${userIsYes ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {userIsYes ? 'Yes' : 'No'}
                        </span>
                        <span className="flex gap-0.5">
                          {[1,2,3,4].map(i => (
                            <span 
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i <= qotdResponse.confidence
                                  ? userIsYes
                                    ? i === 1 ? 'bg-emerald-800' : i === 2 ? 'bg-emerald-600' : i === 3 ? 'bg-emerald-400' : 'bg-emerald-300'
                                    : i === 1 ? 'bg-rose-800' : i === 2 ? 'bg-rose-600' : i === 3 ? 'bg-rose-400' : 'bg-rose-300'
                                  : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                      
                      <span className="flex-1" />
                      
                      {/* Mini distribution bar - builds from center */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-rose-400 w-4 text-right">{noPct}</span>
                        <div className="relative w-24 h-3 bg-gray-800 rounded-sm overflow-hidden">
                          {/* NO side - builds left from center */}
                          <div className="absolute right-1/2 top-0 h-full flex justify-end" style={{ width: '50%' }}>
                            <div className="h-full flex justify-end" style={{ width: `${noPct * 2}%` }}>
                              {[0,1,2,3].map(i => {
                                const count = noDist[i] || 0;
                                const segPct = noVotes > 0 ? (count / noVotes) * 100 : 0;
                                const colors = ['#fda4af', '#f43f5e', '#be123c', '#881337'];
                                return segPct > 0 && <div key={i} className="h-full" style={{ width: `${segPct}%`, background: colors[i] }} />;
                              })}
                            </div>
                          </div>
                          {/* YES side - builds right from center */}
                          <div className="absolute left-1/2 top-0 h-full" style={{ width: '50%' }}>
                            <div className="h-full flex" style={{ width: `${yesPct * 2}%` }}>
                              {[0,1,2,3].map(i => {
                                const count = yesDist[i] || 0;
                                const segPct = yesVotes > 0 ? (count / yesVotes) * 100 : 0;
                                const colors = ['#064e3b', '#059669', '#34d399', '#a7f3d0'];
                                return segPct > 0 && <div key={i} className="h-full" style={{ width: `${segPct}%`, background: colors[i] }} />;
                              })}
                            </div>
                          </div>
                          {/* Center line */}
                          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white/70 -translate-x-1/2" />
                        </div>
                        <span className="text-[10px] text-emerald-400 w-4">{yesPct}</span>
                        {/* Spread */}
                        <span className={`text-[10px] font-medium ${yesPct > noPct ? 'text-emerald-400' : yesPct < noPct ? 'text-rose-400' : 'text-gray-400'}`}>
                          {yesPct === noPct ? '—' : `${yesPct > noPct ? '+' : ''}${yesPct - noPct}`}
                        </span>
                      </div>
                    </button>
                  );
                } else {
                  // MC question
                  const dist = QOTD_DATA.current.distribution;
                  const totals = dist.map(opt => opt.reduce((a, b) => a + b, 0));
                  const totalVotes = totals.reduce((a, b) => a + b, 0);
                  const pcts = totals.map(t => totalVotes > 0 ? Math.round((t / totalVotes) * 100) : 0);
                  const maxPct = Math.max(...pcts);
                  const userChoice = qotdResponse.answer;
                  const userPct = pcts[userChoice] || 0;
                  const letters = ['A', 'B', 'C', 'D', 'E'];
                  const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];
                  
                  return (
                    <button 
                      onClick={() => setScreen('qotd')}
                      className={`w-full flex items-center gap-2 p-2 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg mb-1`}
                    >
                      <span className="text-sm">☀️</span>
                      
                      {/* User's answer with confidence */}
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-violet-400">
                          {letters[userChoice]}
                        </span>
                        <span className="flex gap-0.5">
                          {[1,2,3,4].map(i => (
                            <span 
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i <= qotdResponse.confidence
                                  ? i === 1 ? 'bg-violet-800' : i === 2 ? 'bg-violet-600' : i === 3 ? 'bg-violet-400' : 'bg-violet-300'
                                  : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                      
                      <span className="flex-1" />
                      
                      {/* Mini vertical bars for each option - grow upward from baseline */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-end gap-0.5 h-4">
                          {pcts.map((pct, i) => {
                            const isLeader = pct === maxPct;
                            const isUser = i === userChoice;
                            return (
                              <div 
                                key={i}
                                className={`w-2.5 rounded-t-sm ${isLeader ? 'ring-1 ring-white/60' : ''}`}
                                style={{ 
                                  height: `${Math.max(3, pct * 0.14)}px`,
                                  background: colors[i],
                                  opacity: isLeader ? 1 : 0.4
                                }} 
                              />
                            );
                          })}
                        </div>
                        <div className="flex gap-0.5">
                          {letters.slice(0, pcts.length).map((l, i) => {
                            const isLeader = pcts[i] === maxPct;
                            const isUser = i === userChoice;
                            return (
                              <span 
                                key={i} 
                                className={`text-[8px] w-2.5 text-center ${
                                  isUser ? 'text-violet-400 font-bold' : 
                                  isLeader ? 'text-white font-bold' : 
                                  'text-gray-500'
                                }`}
                              >
                                {l}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Leader indicator */}
                      <span className="text-[10px] text-violet-400 ml-1">
                        {letters[pcts.indexOf(maxPct)]} {maxPct}%
                      </span>
                    </button>
                  );
                }
              })()
            ) : qotdMinimized ? (
              /* Minimized - unanswered */
              <button 
                onClick={() => setQotdMinimized(false)}
                className={`w-full flex items-center gap-2 p-2 ${darkMode ? 'bg-blue-900/20 border border-blue-500/20' : 'bg-blue-50'} rounded-lg mb-1`}
              >
                <span className="text-sm">☀️</span>
                <span className="text-xs text-blue-400">Daily Question</span>
                <span className="flex-1" />
                <span className="text-[10px] text-gray-500">{qotdTime.hours}h {qotdTime.minutes}m</span>
                <span className="text-blue-400 text-xs">+</span>
              </button>
            ) : (
              /* Expanded state - full card */
              <div className="w-full rounded-xl overflow-hidden mb-2 relative">
                {/* Minimize button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setQotdMinimized(true); }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/70 hover:text-white text-sm font-bold"
                >
                  −
                </button>
                <button 
                  onClick={() => setScreen('qotd')}
                  className="w-full text-left"
                >
                  <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-3 pr-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">☀️</span>
                      <span className="font-bold text-white text-sm">Daily Question</span>
                      <span className="flex-1" />
                      <span className="text-xs text-white/70">{qotdTime.hours}h {qotdTime.minutes}m</span>
                    </div>
                    <p className="text-white text-sm font-medium leading-snug mb-2">
                      {QOTD_DATA.current.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <span>{QOTD_DATA.current.sponsor.avatar}</span>
                        <span>{QOTD_DATA.current.sponsor.name}</span>
                      </div>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
                        +{QOTD_DATA.current.reward} pts
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 flex items-center justify-between ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <span className="text-xs text-gray-500">{QOTD_DATA.current.totalResponses.toLocaleString()} responses</span>
                    <span className="text-xs text-blue-400">Answer now →</span>
                  </div>
                </button>
              </div>
            )}
            
            {/* Random */}
            <button 
              onClick={() => { setSelectedCategory('random'); setScreen('category'); }}
              className={`w-full flex items-center gap-2 p-2 ${darkMode ? 'bg-violet-900/20' : 'bg-violet-100'} rounded-lg`}
            >
              <span className="text-lg">🎲</span>
              <span className="text-sm font-medium flex-1">Mix</span>
            </button>
            
            {/* Categories */}
            {CATEGORIES.map(cat => {
              const bp = getProgress(cat.id, 'binary');
              const mp = getProgress(cat.id, 'multiple');
              const totalAnswered = bp.answered + mp.answered;
              const totalQuestions = bp.total + mp.total;
              const totalAvailable = totalQuestions - totalAnswered;
              const progress = totalQuestions > 0 ? totalAnswered / totalQuestions : 0;
              if (!bp.total && !mp.total) return null;
              
              return (
                <button 
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setScreen('category'); }}
                  className={`w-full flex items-center gap-2 p-2 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg`}
                >
                  <div className="relative">
                    {totalAnswered > 0 && (
                      <div className="absolute -inset-0.5">
                        <ProgressRing progress={progress} size={28} strokeWidth={2} color={cat.color} />
                      </div>
                    )}
                    <span className="text-lg block w-6 h-6 flex items-center justify-center">{cat.icon}</span>
                  </div>
                  <span className="text-sm font-medium flex-1">{cat.name}</span>
                  {totalAvailable > 0 ? (
                    <span className="text-xs text-gray-500">{totalAvailable}</span>
                  ) : (
                    <span className="text-xs text-emerald-500">✓</span>
                  )}
                </button>
              );
            })}
            
            {/* Tasks */}
            <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              {/* Saved for Later (if any) */}
              {savedQuestions.size > 0 && (
                <button
                  onClick={() => { setSelectedCategory('saved'); setScreen('category'); }}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg mb-1 ${darkMode ? 'bg-amber-900/20' : 'bg-amber-50'}`}
                >
                  <span className="text-lg">🔖</span>
                  <span className="text-sm font-medium flex-1">Saved for Later</span>
                  <span className="text-xs text-amber-400">{savedQuestions.size}</span>
                </button>
              )}
              
              <button
                onClick={() => setScreen('turk')}
                className={`w-full flex items-center gap-2 p-2 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                <span className="text-lg">🔧</span>
                <span className="text-sm font-medium flex-1">Tasks</span>
                {turkEarnings > 0 && <span className="text-xs text-emerald-400">+{turkEarnings}</span>}
                <span className="text-xs text-gray-500">{getAvailableTasks().length}</span>
              </button>
              
              {/* History button */}
              {Object.keys(responses).length > 0 && (
                <button
                  onClick={() => setScreen('history')}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg mt-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                >
                  <span className="text-lg">📋</span>
                  <span className="text-sm font-medium flex-1">History</span>
                  <span className="text-xs text-gray-500">{Object.keys(responses).length}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Category detail - select track
  if (screen === 'category') {
    const isRandom = selectedCategory === 'random';
    const isSaved = selectedCategory === 'saved';
    const categoryInfo = isRandom 
      ? { icon: '🎲', name: 'Mix' } 
      : isSaved 
      ? { icon: '🔖', name: 'Saved for Later' }
      : CATEGORIES.find(c => c.id === selectedCategory);
    const bp = getProgress(selectedCategory, 'binary');
    const mp = getProgress(selectedCategory, 'multiple');
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className="flex-1 flex flex-col text-white">
          {/* Category header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
            <button onClick={() => setScreen('categories')} className="text-gray-400">←</button>
            <span className="text-xl">{categoryInfo?.icon}</span>
            <span className="font-medium flex-1">{categoryInfo?.name}</span>
          </div>
          
          {/* Track options */}
          <div className="flex-1 p-3 space-y-2">
            {/* Empty saved state */}
            {isSaved && bp.total === 0 && mp.total === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="text-3xl mb-2">🔖</div>
                <p className="text-gray-400 text-sm">No saved questions yet</p>
                <p className="text-gray-600 text-xs mt-1">Tap "Maybe Later" on questions you want to revisit</p>
              </div>
            )}
            
            {/* Yes/No track */}
            {bp.total > 0 && (
              <button 
                onClick={() => selectTrack(selectedCategory, 'binary')}
                className="w-full p-3 bg-gray-900 rounded-lg flex items-center gap-3"
              >
                <span className="text-emerald-400 font-medium text-sm">Yes/No</span>
                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: `${(bp.answered / bp.total) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500">{bp.unanswered}</span>
              </button>
            )}
            
            {/* Multiple Choice track */}
            {mp.total > 0 && (
              <button 
                onClick={() => selectTrack(selectedCategory, 'multiple')}
                className="w-full p-3 bg-gray-900 rounded-lg flex items-center gap-3"
              >
                <span className="text-violet-400 font-medium text-sm">Choice</span>
                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-600" style={{ width: `${(mp.answered / mp.total) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500">{mp.unanswered}</span>
              </button>
            )}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Question
  if (screen === 'question') {
    // Track completion screen when no questions left
    const remainingInTrack = allQuestions.filter(q => !responses[q.id] && !skippedQuestions.has(q.id)).length;
    
    if (!question || remainingInTrack === 0) {
      const otherCategories = CATEGORIES
        .filter(cat => cat.id !== selectedCategory)
        .map(cat => {
          const bp = getProgress(cat.id, 'binary');
          const mp = getProgress(cat.id, 'multiple');
          const remaining = bp.unanswered + mp.unanswered;
          return { ...cat, remaining };
        })
        .filter(cat => cat.remaining > 0)
        .sort((a, b) => b.remaining - a.remaining)
        .slice(0, 3);
      
      const currentCatInfo = selectedCategory === 'random' 
        ? { icon: '🎲', name: 'Mix' }
        : selectedCategory === 'saved'
        ? { icon: '🔖', name: 'Saved' }
        : CATEGORIES.find(c => c.id === selectedCategory);
      
      const answeredInTrack = allQuestions.filter(q => responses[q.id]).length;
      
      return (
        <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
          <div className="flex-1 flex flex-col text-white">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <button onClick={backToCategory} className="text-gray-400">←</button>
              <span className="text-lg">{currentCatInfo?.icon}</span>
              <span className="font-medium flex-1">{currentCatInfo?.name}</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-gray-200 font-medium text-lg mb-1">Track Complete!</p>
              <p className="text-gray-500 text-sm mb-6">{answeredInTrack} question{answeredInTrack !== 1 ? 's' : ''} answered</p>
              
              {otherCategories.length > 0 ? (
                <div className="w-full max-w-xs space-y-2">
                  <p className="text-xs text-gray-500 text-center mb-2">Continue with:</p>
                  {otherCategories.map(cat => (
                    <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setScreen('category'); }}
                      className="w-full flex items-center gap-3 p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
                      <span className="text-xl">{cat.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{cat.name}</div>
                        <div className="text-xs text-gray-500">{cat.remaining} questions left</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">You've answered all available questions!</p>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <button onClick={() => setScreen('categories')} 
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium text-sm transition-colors">
                Back to Categories
              </button>
            </div>
          </div>
        </PhoneFrame>
      );
    }
    
    const categoryInfo = CATEGORIES.find(c => c.id === selectedCategory);
    const maxIndex = allQuestions.length - 1;
    
    const getAnswerLabel = (ans) => {
      if (isBinary) return ans === 0 ? 'YES' : ans === 1 ? 'NO' : "Can't answer";
      return allOptions[ans];
    };

    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className="flex-1 flex flex-col text-white">
          {showFlagModal && <FlagModal onClose={() => setShowFlagModal(false)} onFlag={handleFlag} />}
          
          {/* Can't Answer Modal (binary) */}
          {showCantAnswerModal && (
            <CantAnswerModal 
              onClose={() => setShowCantAnswerModal(false)} 
              onSelect={(reason) => {
                setCantAnswerReason(reason);
                submitWithConfidence(2, 1);
                setShowCantAnswerModal(false);
              }} 
            />
          )}
          
          {/* None Option Modal (multiple choice) */}
          {showNoneOptionModal && (
            <NoneOptionModal 
              onClose={() => setShowNoneOptionModal(false)}
              customValue={customAnswer}
              onCustomChange={setCustomAnswer}
              onCustomAnswer={(text) => {
                setCustomAnswer(text);
                submitWithConfidence(allOptions.length - 1, 2); // None with custom = medium confidence
                setShowNoneOptionModal(false);
              }}
              onCantAnswer={(reason) => {
                setCantAnswerReason(reason);
                submitWithConfidence(allOptions.length - 1, 1); // Can't answer = low confidence
                setShowNoneOptionModal(false);
              }}
            />
          )}
          
          {/* Category + type indicator */}
          <div className={`flex items-center gap-2 px-3 py-1 border-b ${
            categoryInfo?.color === 'amber' ? 'bg-amber-900/10 border-amber-800/30' :
            categoryInfo?.color === 'violet' ? 'bg-violet-900/10 border-violet-800/30' :
            categoryInfo?.color === 'rose' ? 'bg-rose-900/10 border-rose-800/30' :
            categoryInfo?.color === 'pink' ? 'bg-pink-900/10 border-pink-800/30' :
            categoryInfo?.color === 'teal' ? 'bg-teal-900/10 border-teal-800/30' :
            categoryInfo?.color === 'blue' ? 'bg-blue-900/10 border-blue-800/30' : 'border-gray-800'
          }`}>
            <button onClick={() => setScreen('category')} className="text-gray-400">←</button>
            <span className="text-sm">{selectedCategory === 'random' ? '🎲' : categoryInfo?.icon}</span>
            <span className="text-xs text-gray-500 truncate flex-1">
              {selectedCategory === 'random' ? 'Random' : categoryInfo?.name}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${isBinary ? 'bg-emerald-900/50 text-emerald-400' : 'bg-violet-900/50 text-violet-400'}`}>
              {isBinary ? 'Y/N' : 'MC'}
            </span>
            <button onClick={() => setShowFlagModal(true)} className={flags[question.id] ? 'text-rose-400' : 'text-gray-600'}>⚐</button>
          </div>
          
          {/* Progress + nav row */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50">
            <button onClick={goBack} disabled={safeTrackIndex === 0} className={`text-xl font-bold ${safeTrackIndex === 0 ? 'text-gray-700' : 'text-gray-300 active:text-white'}`}>◀</button>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full ${
                categoryInfo?.color === 'amber' ? 'bg-amber-500' :
                categoryInfo?.color === 'violet' ? 'bg-violet-500' :
                categoryInfo?.color === 'rose' ? 'bg-rose-500' :
                categoryInfo?.color === 'pink' ? 'bg-pink-500' :
                categoryInfo?.color === 'teal' ? 'bg-teal-500' :
                categoryInfo?.color === 'blue' ? 'bg-blue-500' : 'bg-violet-600'
              }`} style={{ width: `${((safeTrackIndex + 1) / allQuestions.length) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-500 min-w-fit">
              {allQuestions.filter(q => !responses[q.id]).length} left
            </span>
            {showStreak && streak > 0 && (
              <span className="text-xs font-bold text-orange-400">🔥{streak}</span>
            )}
            <button onClick={goForward} disabled={safeTrackIndex >= maxIndex} className={`text-xl font-bold ${safeTrackIndex >= maxIndex ? 'text-gray-700' : 'text-gray-300 active:text-white'}`}>▶</button>
          </div>

        {/* Scrollable question area */}
        <div className="flex-1 overflow-y-auto p-3">
          <h2 className="text-base font-medium leading-snug mb-3">{question.text}</h2>
          
          {/* Evidence panel */}
          <EvidencePanel 
            preEvidence={question.preEvidence}
            teamEvidence={question.teamEvidence}
            userTeams={userTeams}
            expanded={evidenceExpanded}
            onToggle={() => setEvidenceExpanded(!evidenceExpanded)}
            showPost={false}
          />
        </div>
        
        {/* Fixed bottom answer area */}
        <div className="p-3 border-t border-gray-800 bg-gray-950">
          {/* Pending submit - undo window (tap anywhere to cancel) */}
          {pendingSubmit && pendingSubmit.questionId === question.id ? (
            <div 
              className="relative cursor-pointer active:opacity-80 transition-opacity overflow-hidden rounded-xl"
              onClick={cancelSubmit}
            >
              {/* Background with subtle gradient */}
              <div className={`py-4 px-4 ${
                isBinary 
                  ? pendingSubmit.answer === 0 ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20' 
                  : pendingSubmit.answer === 1 ? 'bg-gradient-to-r from-rose-900/40 to-rose-800/20' 
                  : 'bg-gray-800/50'
                  : 'bg-gradient-to-r from-violet-900/40 to-violet-800/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xl font-bold ${
                      isBinary 
                        ? pendingSubmit.answer === 0 ? 'text-emerald-400' : pendingSubmit.answer === 1 ? 'text-rose-400' : 'text-gray-400'
                        : 'text-violet-400'
                    }`}>
                      {isBinary 
                        ? (pendingSubmit.answer === 0 ? 'YES' : pendingSubmit.answer === 1 ? 'NO' : "Can't") 
                        : allOptions[pendingSubmit.answer]?.slice(0, 20)}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isBinary 
                        ? pendingSubmit.answer === 0 ? 'bg-emerald-500/20 text-emerald-300' 
                        : pendingSubmit.answer === 1 ? 'bg-rose-500/20 text-rose-300' 
                        : 'bg-gray-700 text-gray-400'
                        : 'bg-violet-500/20 text-violet-300'
                    }`}>
                      ●{pendingSubmit.confidence}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">tap to undo</span>
                </div>
              </div>
              {/* Filling progress bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900">
                <div 
                  className={`h-full ${
                    isBinary 
                      ? pendingSubmit.answer === 0 ? 'bg-emerald-500' : pendingSubmit.answer === 1 ? 'bg-rose-500' : 'bg-gray-500'
                      : 'bg-violet-500'
                  }`} 
                  style={{ animation: `fill ${undoDelay}s linear forwards` }} 
                />
              </div>
            </div>
          ) : existingResponse ? (
          // Compact answered state with collapsible community results
          <div className="space-y-2">
            {/* Compact answer summary */}
            <div className={`py-2.5 px-3 rounded-xl ${
              isBinary 
                ? existingResponse.answer === 0 ? 'bg-emerald-900/20 border border-emerald-500/20' 
                : existingResponse.answer === 1 ? 'bg-rose-900/20 border border-rose-500/20' 
                : 'bg-gray-800/50 border border-gray-700'
                : 'bg-violet-900/20 border border-violet-500/20'
            }`}>
              {/* Answer + confidence line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${
                    isBinary 
                      ? existingResponse.answer === 0 ? 'text-emerald-400' : existingResponse.answer === 1 ? 'text-rose-400' : 'text-gray-400'
                      : 'text-violet-400'
                  }`}>
                    {isBinary 
                      ? (existingResponse.answer === 0 ? 'YES' : existingResponse.answer === 1 ? 'NO' : "Can't answer") 
                      : allOptions[existingResponse.answer]?.slice(0, 25)}{!isBinary && allOptions[existingResponse.answer]?.length > 25 ? '...' : ''}
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-400 text-sm">{CONFIDENCE_LABELS[existingResponse.confidence]}</span>
                  {/* Confidence dots */}
                  <div className="flex gap-0.5">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${
                        i <= existingResponse.confidence 
                          ? isBinary 
                            ? existingResponse.answer === 0 ? 'bg-emerald-400' : existingResponse.answer === 1 ? 'bg-rose-400' : 'bg-gray-400'
                            : 'bg-violet-400'
                          : 'bg-gray-700'
                      }`} />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const newResponses = { ...responses };
                    delete newResponses[question.id];
                    setResponses(newResponses);
                  }}
                  className="text-xs text-gray-600 hover:text-gray-400"
                >
                  change
                </button>
              </div>
              
              {existingResponse.cantAnswerReason && (
                <div className="text-xs text-gray-500 mt-1">{existingResponse.cantAnswerReason}</div>
              )}
              {existingResponse.customAnswer && (
                <div className="text-xs text-gray-400 mt-1 italic">"{existingResponse.customAnswer}"</div>
              )}
            </div>
            
            {/* Community summary - collapsible */}
            {existingCommunity && existingCommunity.evaluators && (
              <button 
                onClick={() => setEvidenceExpanded(!evidenceExpanded)}
                className={`w-full text-left p-2 rounded-lg ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {existingCommunity.evaluators.length} responses
                    {isBinary && (() => {
                      const yes = existingCommunity.evaluators.filter(e => e.answer === 0).length;
                      const total = existingCommunity.evaluators.length;
                      const pct = Math.round((existingResponse.answer === 0 ? yes : total - yes) / total * 100);
                      return <span className="text-gray-400"> · {pct}% agree</span>;
                    })()}
                  </div>
                  <span className="text-gray-600 text-xs">{evidenceExpanded ? '▼' : '▶'}</span>
                </div>
                {evidenceExpanded && (
                  <div className="mt-2" onClick={e => e.stopPropagation()}>
                    {isBinary ? (
                      <BinaryChart evaluators={existingCommunity.evaluators} userResponse={existingResponse} />
                    ) : (
                      <MultipleChoiceChart evaluators={existingCommunity.evaluators} userResponse={existingResponse} options={options} />
                    )}
                  </div>
                )}
              </button>
            )}
          </div>
          ) : (
          <div className="space-y-2">
            {/* First-time gesture hint */}
            {showGestureHint && !existingResponse && (
              <div 
                className="bg-violet-900/30 border border-violet-500/30 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer"
                onClick={() => setShowGestureHint(false)}
              >
                <div className="text-xs text-violet-300">
                  <span className="font-medium">Tip:</span> Tap = quick answer · Hold = set confidence
                </div>
                <span className="text-violet-500 text-xs">✕</span>
              </div>
            )}
            
            {/* Binary answers - Tap or Hold */}
            {isBinary && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {/* YES button */}
                    <button
                      onMouseDown={() => handleTapStart(0)}
                      onMouseUp={() => handleTapEnd(0)}
                      onMouseLeave={handleTapCancel}
                      onTouchStart={() => handleTapStart(0)}
                      onTouchEnd={() => handleTapEnd(0)}
                      onTouchCancel={handleTapCancel}
                      className={`relative py-5 rounded-xl font-bold text-lg transition-all overflow-hidden select-none ${
                        (tappedAnswer === 0 || holdingAnswer === 0)
                          ? 'text-white ring-2 ring-emerald-400'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                      style={{ 
                        background: (tappedAnswer === 0 || holdingAnswer === 0)
                          ? `linear-gradient(135deg, 
                              ${(holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) >= 4 ? '#10b981' : (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) >= 3 ? '#059669' : (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) >= 2 ? '#047857' : '#065f46'} 0%, 
                              ${(holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) >= 4 ? '#6ee7b7' : (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) >= 3 ? '#34d399' : (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) >= 2 ? '#10b981' : '#059669'} 100%)`
                          : undefined,
                        transform: (tappedAnswer === 0 || holdingAnswer === 0) ? `scale(${1 + (holdingAnswer === 0 ? holdProgress * 0.06 : tapCount * 0.015)})` : 'scale(1)',
                        boxShadow: (tappedAnswer === 0 || holdingAnswer === 0) 
                          ? `0 0 ${(holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) * 8}px rgba(16, 185, 129, ${0.2 + (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) * 0.15})`
                          : 'none',
                        filter: (tappedAnswer === 0 || holdingAnswer === 0) 
                          ? `brightness(${0.85 + (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) * 0.1}) saturate(${0.7 + (holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount) * 0.2})`
                          : 'none'
                      }}
                    >
                      {/* Confidence segments */}
                      <ConfidenceSegments 
                        level={holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount} 
                        color="emerald" 
                        active={tappedAnswer === 0 || holdingAnswer === 0} 
                      />
                      
                      {/* Tap countdown bar */}
                      {tappedAnswer === 0 && tapCount > 0 && holdingAnswer !== 0 && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-900/50">
                          <div className="h-full bg-emerald-300" style={{ animation: 'shrink 0.5s linear forwards' }} />
                        </div>
                      )}
                      
                      <span className="relative z-10">YES</span>
                      
                      {/* Confidence badge */}
                      {(tappedAnswer === 0 || holdingAnswer === 0) && (
                        <span className="absolute top-2 right-2 text-sm font-bold bg-white/30 w-7 h-7 rounded-full flex items-center justify-center">
                          {holdingAnswer === 0 ? getHoldConfidence(holdProgress) : tapCount}
                        </span>
                      )}
                    </button>
                    
                    {/* NO button */}
                    <button
                      onMouseDown={() => handleTapStart(1)}
                      onMouseUp={() => handleTapEnd(1)}
                      onMouseLeave={handleTapCancel}
                      onTouchStart={() => handleTapStart(1)}
                      onTouchEnd={() => handleTapEnd(1)}
                      onTouchCancel={handleTapCancel}
                      className={`relative py-5 rounded-xl font-bold text-lg transition-all overflow-hidden select-none ${
                        (tappedAnswer === 1 || holdingAnswer === 1)
                          ? 'text-white ring-2 ring-rose-400'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                      style={{ 
                        background: (tappedAnswer === 1 || holdingAnswer === 1)
                          ? `linear-gradient(135deg, 
                              ${(holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) >= 4 ? '#f43f5e' : (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) >= 3 ? '#e11d48' : (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) >= 2 ? '#be123c' : '#9f1239'} 0%, 
                              ${(holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) >= 4 ? '#fda4af' : (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) >= 3 ? '#fb7185' : (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) >= 2 ? '#f43f5e' : '#e11d48'} 100%)`
                          : undefined,
                        transform: (tappedAnswer === 1 || holdingAnswer === 1) ? `scale(${1 + (holdingAnswer === 1 ? holdProgress * 0.06 : tapCount * 0.015)})` : 'scale(1)',
                        boxShadow: (tappedAnswer === 1 || holdingAnswer === 1) 
                          ? `0 0 ${(holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) * 8}px rgba(244, 63, 94, ${0.2 + (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) * 0.15})`
                          : 'none',
                        filter: (tappedAnswer === 1 || holdingAnswer === 1) 
                          ? `brightness(${0.85 + (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) * 0.1}) saturate(${0.7 + (holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount) * 0.2})`
                          : 'none'
                      }}
                    >
                      {/* Confidence segments */}
                      <ConfidenceSegments 
                        level={holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount} 
                        color="rose" 
                        active={tappedAnswer === 1 || holdingAnswer === 1} 
                      />
                      
                      {/* Tap countdown bar */}
                      {tappedAnswer === 1 && tapCount > 0 && holdingAnswer !== 1 && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose-900/50">
                          <div className="h-full bg-rose-300" style={{ animation: 'shrink 0.5s linear forwards' }} />
                        </div>
                      )}
                      
                      <span className="relative z-10">NO</span>
                      
                      {(tappedAnswer === 1 || holdingAnswer === 1) && (
                        <span className="absolute top-2 right-2 text-sm font-bold bg-white/30 w-7 h-7 rounded-full flex items-center justify-center">
                          {holdingAnswer === 1 ? getHoldConfidence(holdProgress) : tapCount}
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {/* Confidence label */}
                  <div className="text-center text-[10px] text-gray-500">
                    {(tappedAnswer !== null || holdingAnswer !== null) 
                      ? <span className="text-gray-400">
                          {CONFIDENCE_LABELS[holdingAnswer !== null ? getHoldConfidence(holdProgress) : tapCount]}
                          <span className="text-gray-600"> · {holdingAnswer !== null ? 'release' : tapCount < 4 ? 'tap ↑' : 'max'}</span>
                        </span>
                      : 'tap or hold'
                    }
                  </div>
                  
                  <button
                    onClick={() => setShowCantAnswerModal(true)}
                    className="w-full py-1.5 rounded-lg text-xs transition-all select-none bg-gray-800/50 text-gray-500 hover:bg-gray-700/50"
                  >Can't answer</button>
                </>
              )}

              {/* Multiple choice answers */}
              {!isBinary && (
                <div className="space-y-1">
                  {allOptions.map((opt, i) => {
                    const isNone = i === allOptions.length - 1;
                    const isSelected = tappedAnswer === i || holdingAnswer === i;
                    const conf = holdingAnswer === i ? getHoldConfidence(holdProgress) : tapCount;
                    
                    // "None" button opens modal
                    if (isNone) {
                      return (
                        <button
                          key={i}
                          onClick={() => setShowNoneOptionModal(true)}
                          className="w-full py-2 px-3 rounded-lg text-left text-xs transition-all bg-gray-800/50 text-gray-500 hover:bg-gray-700/50"
                        >
                          None of the above
                        </button>
                      );
                    }
                    
                    return (
                      <button
                        key={i}
                        onMouseDown={() => handleTapStart(i)}
                        onMouseUp={() => handleTapEnd(i)}
                        onMouseLeave={handleTapCancel}
                        onTouchStart={() => handleTapStart(i)}
                        onTouchEnd={() => handleTapEnd(i)}
                        onTouchCancel={handleTapCancel}
                        className={`w-full py-2.5 px-3 rounded-lg text-left text-sm transition-all relative overflow-hidden select-none ${
                          isSelected 
                            ? 'text-white ring-1 ring-violet-400'
                            : 'bg-gray-800 text-gray-300'
                        }`}
                        style={{ 
                          background: isSelected
                            ? `linear-gradient(135deg, 
                                ${conf >= 4 ? '#7c3aed' : conf >= 3 ? '#6d28d9' : conf >= 2 ? '#5b21b6' : '#4c1d95'} 0%, 
                                ${conf >= 4 ? '#c4b5fd' : conf >= 3 ? '#a78bfa' : conf >= 2 ? '#8b5cf6' : '#7c3aed'} 100%)`
                            : undefined,
                          transform: isSelected ? `scale(${1 + conf * 0.005})` : 'scale(1)',
                          boxShadow: isSelected 
                            ? `0 0 ${conf * 6}px rgba(139, 92, 246, ${0.2 + conf * 0.12})`
                            : 'none',
                          filter: isSelected 
                            ? `brightness(${0.85 + conf * 0.1}) saturate(${0.7 + conf * 0.2})`
                            : 'none'
                        }}
                      >
                        {/* Confidence segments */}
                        <ConfidenceSegments level={conf} color="violet" active={isSelected} />
                        
                        {/* Tap countdown */}
                        {tappedAnswer === i && tapCount > 0 && holdingAnswer !== i && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-violet-900/50">
                            <div className="h-full bg-violet-300" style={{ animation: 'shrink 0.5s linear forwards' }} />
                          </div>
                        )}
                        
                        <span className="relative z-10">
                          <span className="text-gray-400/70 mr-1.5 text-xs">{String.fromCharCode(65 + i)}</span>
                          {opt}
                        </span>
                        
                        {isSelected && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-white/20 w-5 h-5 rounded-full flex items-center justify-center z-10">
                            {conf}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {!tappedAnswer && !pendingSubmit && (
                <div className="flex items-center justify-center gap-4 py-1">
                  <button 
                    onClick={skipQuestion} 
                    className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
                  >
                    Skip
                  </button>
                  <button 
                    onClick={maybeLater} 
                    className={`text-xs transition-colors ${savedQuestions.has(question?.id) ? 'text-amber-400' : 'text-gray-600 hover:text-amber-400'}`}
                  >
                    🔖 {savedQuestions.has(question?.id) ? 'Saved' : 'Maybe Later'}
                  </button>
                </div>
              )}
              
              <style>{`
                @keyframes shrink {
                  from { width: 100%; }
                  to { width: 0%; }
                }
                @keyframes fill {
                  from { width: 0%; }
                  to { width: 100%; }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
    );
  }

  // Profile
  // Answer History screen (from B1_4)
  if (screen === 'history') {
    const answeredQuestions = shuffledQuestions
      .filter(q => responses[q.id])
      .map(q => ({
        ...q,
        response: responses[q.id],
        community: communityResults[q.id]
      }))
      .sort((a, b) => (b.response.timestamp || 0) - (a.response.timestamp || 0));
    
    const filteredQuestions = answeredQuestions.filter(q => {
      if (historyFilter === 'all') return true;
      if (historyFilter === 'high') return q.response.confidence >= 3;
      if (historyFilter === 'low') return q.response.confidence <= 2;
      return q.category === historyFilter;
    });
    
    const getAnswerLabel = (q) => {
      if (q.type === 'binary') {
        return q.response.answer === 0 ? 'YES' : q.response.answer === 1 ? 'NO' : "Can't";
      }
      const opts = [...(q.options || []), "None"];
      return opts[q.response.answer] || '?';
    };
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className="flex-1 flex flex-col text-white">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
            <button onClick={() => setScreen('categories')} className="text-gray-400">←</button>
            <span className="font-medium flex-1">History</span>
            <span className="text-xs text-gray-500">{answeredQuestions.length} answered</span>
          </div>
          
          {/* Filter tabs */}
          <div className="flex gap-1 p-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'high', label: 'High Conf' },
              { id: 'low', label: 'Low Conf' },
              ...CATEGORIES.map(c => ({ id: c.id, label: c.icon }))
            ].map(f => (
              <button key={f.id} onClick={() => setHistoryFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  historyFilter === f.id ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}>
                {f.label}
              </button>
            ))}
          </div>
          
          {/* Questions list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredQuestions.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-gray-500 text-sm">No questions match this filter</p>
              </div>
            ) : filteredQuestions.map(q => {
              const catInfo = CATEGORIES.find(c => c.id === q.category);
              const isExpanded = evidenceExpanded === `history-${q.id}`;
              
              return (
                <div key={q.id} className="bg-gray-900 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-sm">{catInfo?.icon || '❓'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200 leading-snug line-clamp-2">{q.text}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-xs font-medium ${
                          q.type === 'binary' 
                            ? (q.response.answer === 0 ? 'text-emerald-400' : q.response.answer === 1 ? 'text-rose-400' : 'text-gray-400')
                            : 'text-violet-400'
                        }`}>
                          {getAnswerLabel(q)}
                        </span>
                        <ConfidenceDots level={q.response.confidence} />
                        <span className="text-[10px] text-gray-600">{CONFIDENCE_LABELS[q.response.confidence]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expandable community */}
                  {q.community && (
                    <button onClick={() => setEvidenceExpanded(isExpanded ? null : `history-${q.id}`)}
                      className="w-full mt-2 text-left">
                      <div className="flex items-center justify-between text-[10px] text-gray-600">
                        <span>{q.community.evaluators?.length || 0} responses</span>
                        <span>{isExpanded ? '▲' : '▼'}</span>
                      </div>
                      {isExpanded && (
                        <div className="mt-2">
                          {q.type === 'binary' ? (
                            <BinaryChart evaluators={q.community.evaluators} userResponse={q.response} />
                          ) : (
                            <MultipleChoiceChart evaluators={q.community.evaluators} userResponse={q.response} options={q.options} />
                          )}
                        </div>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Profile - enhanced with stats (from B1_4)
  if (screen === 'profile') {
    const answeredList = Object.entries(responses).map(([id, r]) => ({ id: parseInt(id), ...r }));
    const answered = answeredList.length;
    const avgConf = answered > 0 ? (answeredList.reduce((s, r) => s + r.confidence, 0) / answered).toFixed(1) : '—';
    
    // Confidence distribution
    const confDist = [0, 0, 0, 0];
    answeredList.forEach(r => confDist[r.confidence - 1]++);
    const maxConf = Math.max(...confDist, 1);
    
    // Category breakdown
    const categoryBreakdown = {};
    answeredList.forEach(r => {
      const q = shuffledQuestions.find(q => q.id === r.id);
      if (q) {
        categoryBreakdown[q.category] = (categoryBreakdown[q.category] || 0) + 1;
      }
    });

    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className="flex-1 flex flex-col text-white overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
            <button onClick={() => setScreen('categories')} className="text-gray-400">←</button>
            <span className="font-medium flex-1">Profile</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* User info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center font-bold text-lg">{username[0]?.toUpperCase()}</div>
              <div>
                <h2 className="font-medium">{username}</h2>
                {userTeams.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {userTeams.map(t => <span key={t} className="text-xs px-1.5 py-0.5 bg-violet-900/50 text-violet-300 rounded">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
            
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-900 rounded-lg p-2.5 text-center">
                <div className="text-xl font-bold">{answered}</div>
                <div className="text-[10px] text-gray-500">Answered</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-2.5 text-center">
                <div className="text-xl font-bold">{avgConf}</div>
                <div className="text-[10px] text-gray-500">Avg Conf</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-2.5 text-center">
                <div className="text-xl font-bold">{skippedQuestions.size}</div>
                <div className="text-[10px] text-gray-500">Skipped</div>
              </div>
            </div>
            
            {/* Confidence distribution */}
            {answered > 0 && (
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Confidence Distribution</div>
                <div className="flex items-end gap-1 h-16">
                  {confDist.map((count, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-gray-800 rounded-t flex-1 relative" style={{ minHeight: '4px' }}>
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-violet-500 rounded-t transition-all duration-300"
                          style={{ height: `${(count / maxConf) * 100}%`, minHeight: count > 0 ? '4px' : '0' }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">{CONFIDENCE_LABELS[i + 1]?.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {confDist.map((count, i) => (
                    <span key={i} className="flex-1 text-center text-[10px] text-gray-600">{count}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Category breakdown */}
            {Object.keys(categoryBreakdown).length > 0 && (
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">By Category</div>
                <div className="space-y-1.5">
                  {CATEGORIES.filter(c => categoryBreakdown[c.id]).map(cat => {
                    const count = categoryBreakdown[cat.id];
                    const total = shuffledQuestions.filter(q => q.category === cat.id).length;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={cat.id} className="flex items-center gap-2">
                        <span className="text-sm w-5">{cat.icon}</span>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Calibration placeholder */}
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <span className="text-sm text-gray-300">Calibration</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Available after predictions resolve. Keep answering!</p>
            </div>
          </div>
          <div className="p-3 border-t border-gray-800">
            <button onClick={() => setScreen('categories')} className="w-full py-2 bg-violet-600 rounded-lg font-medium text-sm transition-all hover:bg-violet-500">Continue</button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Turk main screen - task type selection
  if (screen === 'turk') {
    const typeCounts = getTurkTypeCounts();
    const totalAvailable = Object.values(typeCounts).reduce((a, b) => a + b, 0);
    const totalCompleted = Object.keys(turkResponses).length;
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {/* Header */}
          <div className={`flex items-center gap-2 px-3 py-2 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={() => setScreen('categories')} className="text-gray-400">←</button>
            <span className="text-xl">🔧</span>
            <span className="font-medium flex-1">Turk Tasks</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
              +{turkEarnings} pts
            </span>
          </div>
          
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete tasks to earn rewards. {totalAvailable} tasks available.
            </p>
            
            {/* Stats bar */}
            <div className={`flex gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-emerald-400">{turkEarnings}</div>
                <div className="text-xs text-gray-500">Earned</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold">{totalCompleted}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-amber-400">{totalAvailable}</div>
                <div className="text-xs text-gray-500">Available</div>
              </div>
            </div>
            
            {/* Task types */}
            {TURK_TASK_TYPES.map(type => {
              const count = typeCounts[type.id];
              const colorMap = {
                emerald: 'bg-emerald-500/20 text-emerald-400',
                blue: 'bg-blue-500/20 text-blue-400',
                rose: 'bg-rose-500/20 text-rose-400',
                amber: 'bg-amber-500/20 text-amber-400',
                violet: 'bg-violet-500/20 text-violet-400',
              };
              
              return (
                <button
                  key={type.id}
                  onClick={() => { setSelectedTurkType(type.id); setScreen('turk-type'); }}
                  disabled={count === 0}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    count > 0 
                      ? `${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}` 
                      : 'opacity-40'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{type.name}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{type.description}</div>
                  </div>
                  {count > 0 ? (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colorMap[type.color]}`}>
                      {count}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-600">None</span>
                  )}
                </button>
              );
            })}
            
            {/* Assigned tasks callout */}
            {(() => {
              const assignedTasks = getAvailableTasks().filter(t => t.access === 'assigned');
              const count = assignedTasks.length;
              if (count === 0) return null;
              return (
                <button 
                  onClick={() => setScreen('assigned-tasks')}
                  className="w-full p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">⚡</span>
                    <span className="text-sm text-amber-300 flex-1">
                      {count} assigned task{count !== 1 ? 's' : ''} waiting
                    </span>
                  </div>
                </button>
              );
            })()}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Assigned Tasks screen
  if (screen === 'assigned-tasks') {
    const assignedTasks = getAvailableTasks().filter(t => t.access === 'assigned');
    const activeTasks = assignedTasks.filter(t => !savedTasks.includes(t.id));
    const saved = assignedTasks.filter(t => savedTasks.includes(t.id));
    
    const handleSaveTask = (taskId) => {
      setSavedTasks(prev => [...prev, taskId]);
    };
    
    const handleDeclineTask = (taskId) => {
      setDeclinedTasks(prev => [...prev, taskId]);
      setSavedTasks(prev => prev.filter(id => id !== taskId));
    };
    
    const handleUnsaveTask = (taskId) => {
      setSavedTasks(prev => prev.filter(id => id !== taskId));
    };
    
    const handleDoTask = (task) => {
      setSelectedTask(task);
      setSelectedTurkType(task.type);
      startTaskTimer(task);
      setScreen('turk-task');
    };
    
    const getTypeInfo = (typeId) => TURK_TASK_TYPES.find(t => t.id === typeId);
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {/* Header */}
          <div className={`flex items-center gap-2 px-3 py-2 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={() => setScreen('turk')} className="text-gray-400">←</button>
            <span className="text-xl">⚡</span>
            <span className="font-medium flex-1">Assigned Tasks</span>
            <span className="text-xs text-gray-500">{assignedTasks.length} total</span>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {assignedTasks.length === 0 ? (
              (() => {
                // Find task types with available tasks
                const availableTypes = TURK_TASK_TYPES.filter(t => getAvailableTasks(t.id).length > 0);
                const totalAvailable = availableTypes.reduce((sum, t) => sum + getAvailableTasks(t.id).length, 0);
                
                return (
                  <div className="text-center py-6 text-gray-500">
                    <div className="text-3xl mb-2">✓</div>
                    <div className="text-sm mb-4">No assigned tasks</div>
                    
                    {totalAvailable > 0 ? (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 mb-3">Pick up open tasks:</div>
                        {availableTypes.slice(0, 3).map(type => {
                          const count = getAvailableTasks(type.id).length;
                          return (
                            <button 
                              key={type.id}
                              onClick={() => { setSelectedTurkType(type.id); setScreen('turk-type'); }}
                              className={`w-full p-3 rounded-lg flex items-center gap-3 ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`}
                            >
                              <span className="text-xl">{type.icon}</span>
                              <span className="flex-1 text-left text-sm text-gray-300">{type.name}</span>
                              <span className="text-xs text-violet-400">{count} available</span>
                            </button>
                          );
                        })}
                        <button onClick={() => setScreen('turk')} className="mt-2 text-xs text-gray-500">
                          View all task types →
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setScreen('turk')} className="px-4 py-2 bg-violet-600 rounded-lg text-sm text-white">
                        Back to Tasks
                      </button>
                    )}
                  </div>
                );
              })()
            ) : (
              <>
                {/* Active assigned tasks */}
                {activeTasks.length > 0 && (
                  <div>
                    <div className="text-xs text-amber-400 uppercase tracking-wide mb-2">
                      New ({activeTasks.length})
                    </div>
                    {activeTasks.map(task => {
                      const typeInfo = getTypeInfo(task.type);
                      return (
                        <div 
                          key={task.id}
                          className={`mb-2 p-3 rounded-lg ${darkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-lg">{typeInfo?.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{task.title}</div>
                              <div className="text-xs text-gray-500">{typeInfo?.name}</div>
                            </div>
                            <span className="text-xs text-emerald-400">${(task.reward / 100).toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleDoTask(task)}
                              className="flex-1 py-2 bg-amber-500 text-black text-xs font-medium rounded-lg"
                            >
                              Do Now
                            </button>
                            <button 
                              onClick={() => handleSaveTask(task.id)}
                              className="px-3 py-2 bg-gray-700 text-gray-300 text-xs rounded-lg"
                            >
                              Later
                            </button>
                            <button 
                              onClick={() => handleDeclineTask(task.id)}
                              className="px-3 py-2 bg-gray-800 text-gray-500 text-xs rounded-lg"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Saved for later */}
                {saved.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                      Saved for Later ({saved.length})
                    </div>
                    {saved.map(task => {
                      const typeInfo = getTypeInfo(task.type);
                      return (
                        <div 
                          key={task.id}
                          className={`mb-2 p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-lg opacity-60">{typeInfo?.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-400">{task.title}</div>
                              <div className="text-xs text-gray-600">{typeInfo?.name}</div>
                            </div>
                            <span className="text-xs text-emerald-400/60">${(task.reward / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { handleUnsaveTask(task.id); handleDoTask(task); }}
                              className="flex-1 py-2 bg-gray-700 text-white text-xs font-medium rounded-lg"
                            >
                              Do Now
                            </button>
                            <button 
                              onClick={() => handleUnsaveTask(task.id)}
                              className="px-3 py-2 bg-gray-800 text-gray-400 text-xs rounded-lg"
                            >
                              Restore
                            </button>
                            <button 
                              onClick={() => handleDeclineTask(task.id)}
                              className="px-3 py-2 bg-gray-800 text-gray-500 text-xs rounded-lg"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Turk type detail - list tasks of a type
  if (screen === 'turk-type') {
    const typeInfo = TURK_TASK_TYPES.find(t => t.id === selectedTurkType);
    const tasks = getAvailableTasks(selectedTurkType);
    
    const getAccessBadge = (task) => {
      if (task.access === 'open') return { text: 'Open', color: 'bg-gray-700 text-gray-300' };
      if (task.access === 'rated') return { text: `Rating ${task.minRating}+`, color: 'bg-blue-500/20 text-blue-400' };
      if (task.access === 'team') return { text: 'Team', color: 'bg-violet-500/20 text-violet-400' };
      if (task.access === 'assigned') return { text: 'Assigned', color: 'bg-amber-500/20 text-amber-400' };
      return { text: '', color: '' };
    };
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {/* Header */}
          <div className={`flex items-center gap-2 px-3 py-2 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={() => setScreen('turk')} className="text-gray-400">←</button>
            <span className="text-xl">{typeInfo?.icon}</span>
            <span className="font-medium flex-1">{typeInfo?.name}</span>
          </div>
          
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {tasks.length === 0 ? (
              (() => {
                // Find other task types with available tasks
                const otherTypes = TURK_TASK_TYPES.filter(t => 
                  t.id !== selectedTurkType && getAvailableTasks(t.id).length > 0
                );
                const totalOther = otherTypes.reduce((sum, t) => sum + getAvailableTasks(t.id).length, 0);
                
                return (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-2">✓</div>
                    <div className="text-gray-500 mb-4">All {typeInfo?.name.toLowerCase()} tasks complete</div>
                    
                    {totalOther > 0 ? (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 mb-3">Continue with other tasks:</div>
                        {otherTypes.slice(0, 3).map(type => {
                          const count = getAvailableTasks(type.id).length;
                          return (
                            <button 
                              key={type.id}
                              onClick={() => { setSelectedTurkType(type.id); }}
                              className={`w-full p-3 rounded-lg flex items-center gap-3 ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`}
                            >
                              <span className="text-xl">{type.icon}</span>
                              <span className="flex-1 text-left text-sm">{type.name}</span>
                              <span className="text-xs text-violet-400">{count} available</span>
                            </button>
                          );
                        })}
                        <button onClick={() => setScreen('turk')} className="mt-2 text-xs text-gray-500">
                          View all task types →
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm text-emerald-400 mb-3">🎉 All tasks complete!</div>
                        <button onClick={() => setScreen('turk')} className="px-4 py-2 bg-violet-600 rounded-lg text-sm">
                          Back to Tasks
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              tasks.map(task => {
                const badge = getAccessBadge(task);
                return (
                  <button
                    key={task.id}
                    onClick={() => { 
                      setSelectedTask(task); 
                      startTaskTimer(task);
                      setScreen('turk-task'); 
                    }}
                    className={`w-full p-3 rounded-lg text-left ${darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          {task.description.slice(0, 60)}...
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-emerald-400 font-bold text-sm">+{task.reward}</div>
                        <div className="text-xs text-gray-500">{task.timeLimit}s</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${badge.color}`}>{badge.text}</span>
                      {task.access === 'team' && (
                        <span className="text-xs text-gray-500">{task.teams?.join(', ')}</span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Turk task detail - complete a task
  if (screen === 'turk-task' && selectedTask) {
    const task = selectedTask;
    const typeInfo = TURK_TASK_TYPES.find(t => t.id === task.type);
    const timeExpired = taskTimeLeft === 0;
    const timeWarning = taskTimeLeft !== null && taskTimeLeft <= 10;
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {/* Header with timer */}
          <div className={`flex items-center gap-2 px-3 py-2 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={() => { 
              if (taskTimerRef.current) clearInterval(taskTimerRef.current);
              setSelectedTask(null); 
              setScreen('turk-type'); 
            }} className="text-gray-400">←</button>
            <span className="text-lg">{typeInfo?.icon}</span>
            <span className="font-medium flex-1 text-sm truncate">{task.title}</span>
            <span className={`text-sm font-mono px-2 py-0.5 rounded ${
              timeExpired ? 'bg-red-500/20 text-red-400' : 
              timeWarning ? 'bg-amber-500/20 text-amber-400' : 
              'bg-gray-800 text-gray-300'
            }`}>
              {taskTimeLeft !== null ? `${Math.floor(taskTimeLeft / 60)}:${(taskTimeLeft % 60).toString().padStart(2, '0')}` : '--:--'}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Task content area */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Description */}
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {task.description}
              </p>
              
              {/* Media/Content display */}
              {task.media && (
                <div className="mb-4">
                  {task.media.type === 'image' && (
                    <div className="rounded-lg overflow-hidden bg-gray-800">
                      <img src={task.media.url} alt="Task content" className="w-full h-48 object-cover" />
                    </div>
                  )}
                  {task.media.type === 'video' && (
                    <div className="relative rounded-lg bg-gray-800 overflow-hidden h-36">
                      {task.media.thumbnail ? (
                        <img src={task.media.thumbnail} alt="" className="w-full h-full object-cover opacity-70" />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <span className="text-4xl">🎬</span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                          <span className="text-xl ml-0.5">▶</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {task.media.type === 'document' && (
                    <div className="rounded-lg bg-gray-800 h-32 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📄</div>
                        <div className="text-xs text-gray-500">Document viewer</div>
                      </div>
                    </div>
                  )}
                  {task.media.type === 'comparison' && task.media.images && (
                    <div className="grid grid-cols-2 gap-2">
                      {task.media.images.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden bg-gray-800">
                          <img src={img} alt={task.media.labels?.[i] || `Profile ${i+1}`} className="w-full h-28 object-cover" />
                          <div className="text-xs text-center py-1 text-gray-400 bg-gray-900">
                            {task.media.labels?.[i] || `Profile ${String.fromCharCode(65 + i)}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {task.media.type === 'audio' && (
                    <div className="rounded-lg bg-gray-800 p-4 flex items-center gap-3">
                      <button className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center">▶</button>
                      <div className="flex-1 h-2 bg-gray-700 rounded-full">
                        <div className="w-1/3 h-full bg-violet-500 rounded-full" />
                      </div>
                      <span className="text-xs text-gray-500">0:00</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Text content */}
              {task.content && (
                <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <p className="text-sm">{task.content}</p>
                </div>
              )}
              
              {/* Player data for review tasks */}
              {task.playerData && (
                <div className={`rounded-lg mb-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className="p-3 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">@{task.playerData.username}</span>
                      <span className="text-xs text-gray-500">{task.playerData.accountAge} old</span>
                    </div>
                    {task.playerData.avgResponseTime && (
                      <div className="text-xs text-gray-500 mt-1">Avg response: {task.playerData.avgResponseTime}</div>
                    )}
                  </div>
                  {task.playerData.answers && (
                    <div className="p-2 max-h-40 overflow-y-auto">
                      <div className="text-xs text-gray-500 mb-2">Recent answers:</div>
                      {task.playerData.answers.slice(0, 6).map((ans, i) => (
                        <div key={i} className="flex items-center justify-between py-1 text-xs border-b border-gray-800 last:border-0">
                          <span className="text-gray-400 truncate flex-1 mr-2">{ans.q}</span>
                          <span className={`font-medium ${ans.a === 'YES' ? 'text-emerald-400' : ans.a === 'NO' ? 'text-rose-400' : 'text-violet-400'}`}>
                            {ans.a}
                          </span>
                          <span className="text-gray-600 ml-2">●{ans.conf}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {task.playerData.calibration && (
                    <div className="p-2">
                      <div className="text-xs text-gray-500 mb-2">Calibration ({task.playerData.totalAnswers} total):</div>
                      {task.playerData.calibration.map((cal, i) => (
                        <div key={i} className="flex items-center gap-2 py-1 text-xs">
                          <span className="text-gray-500 w-16">Conf {cal.conf}:</span>
                          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${parseInt(cal.accuracy) > 60 ? 'bg-emerald-500' : parseInt(cal.accuracy) > 40 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                 style={{ width: cal.accuracy }} />
                          </div>
                          <span className="text-gray-400 w-10 text-right">{cal.accuracy}</span>
                          <span className="text-gray-600 w-8">({cal.count})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Batch review grid */}
              {task.batchReview && (
                <div className={`rounded-lg p-3 mb-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className="text-xs text-gray-500 mb-2">Review these {task.batchReview.items.length} items:</div>
                  <div className="grid grid-cols-5 gap-2">
                    {task.batchReview.items.map((item, i) => (
                      <div key={i} className="relative">
                        <img src={item.img} alt={`Item ${i+1}`} className="w-full aspect-square rounded object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center py-0.5 text-emerald-400">
                          {item.verdict}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Context info */}
              {task.context && (
                <div className={`text-xs p-2 rounded mb-4 ${darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
                  {task.context.connections && <div>Connections: {task.context.connections}</div>}
                  {task.context.avgAccountAge && <div>Avg account age: {task.context.avgAccountAge}</div>}
                  {task.context.sharedConnections && <div>Shared connections: {task.context.sharedConnections}</div>}
                  {task.context.ipOverlap && <div>IP overlap: {task.context.ipOverlap}</div>}
                  {task.context.testType && <div>Test type: {task.context.testType}</div>}
                </div>
              )}
              
              {/* Previous votes for consensus */}
              {task.previousVotes && (
                <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-50 border border-amber-200'}`}>
                  <div className="text-xs text-amber-400 mb-2">Split decision - your vote decides:</div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-rose-400">Remove: {task.previousVotes.remove}</span>
                    <span className="text-emerald-400">Keep: {task.previousVotes.keep}</span>
                  </div>
                </div>
              )}
              
              {/* Flag reason if moderation */}
              {task.flagReason && (
                <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded-lg mb-4">
                  <div className="text-xs text-rose-400">Flag reason: {task.flagReason}</div>
                </div>
              )}
            </div>
            
            {/* Answer options */}
            <div className={`p-3 border-t ${darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'}`}>
              {timeExpired ? (
                <div className="text-center py-4">
                  <div className="text-red-400 mb-2">⏱️ Time expired</div>
                  <button 
                    onClick={() => { setSelectedTask(null); setScreen('turk-type'); }}
                    className="px-4 py-2 bg-gray-700 rounded-lg text-sm"
                  >
                    Back to Tasks
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {task.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => submitTurkTask(task.id, i)}
                      disabled={turkSubmitting}
                      className={`w-full py-2.5 px-3 rounded-lg text-left text-sm transition-all ${
                        turkSubmitting ? 'opacity-50 cursor-not-allowed' :
                        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-gray-500 mr-2">{String.fromCharCode(65 + i)}</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Reward indicator */}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Reward: <span className="text-emerald-400 font-medium">+{task.reward} pts</span></span>
                <span>Time limit: {task.timeLimit}s</span>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Question of the Day screen
  if (screen === 'qotd') {
    const qotd = QOTD_DATA.current;
    const qotdTime = getQotdTimeRemaining();
    const hasAnswered = qotdResponse !== null;
    const isBinary = qotd.type === 'binary';
    const options = qotd.options || [];
    
    // Calculate results distribution
    let total, results;
    if (isBinary) {
      const yesTotal = qotd.distribution.yes.reduce((a, b) => a + b, 0);
      const noTotal = qotd.distribution.no.reduce((a, b) => a + b, 0);
      total = yesTotal + noTotal;
      const yesPct = Math.round((yesTotal / total) * 100);
      const noPct = 100 - yesPct;
      results = { yesTotal, noTotal, yesPct, noPct };
    } else {
      const totals = qotd.distribution.map(opt => opt.reduce((a, b) => a + b, 0));
      total = totals.reduce((a, b) => a + b, 0);
      const pcts = totals.map(t => total > 0 ? Math.round((t / total) * 100) : 0);
      const maxIdx = pcts.indexOf(Math.max(...pcts));
      results = { totals, pcts, maxIdx };
    }
    
    // Confidence-weighted visualization component for binary
    const ConfidenceBar = ({ distribution, color, label, pct, userAnswer, userConf, isWinner }) => {
      const barTotal = distribution.reduce((a, b) => a + b, 0);
      const isUserSide = userAnswer !== null && (label === 'Yes' ? userAnswer === 0 : userAnswer === 1);
      const colors = color === 'emerald' 
        ? ['bg-emerald-900/60', 'bg-emerald-700/70', 'bg-emerald-500/80', 'bg-emerald-400']
        : ['bg-rose-900/60', 'bg-rose-700/70', 'bg-rose-500/80', 'bg-rose-400'];
      
      return (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm ${isWinner ? 'font-bold' : ''} ${color === 'emerald' ? 'text-emerald-400' : 'text-rose-400'} ${isUserSide ? 'underline' : ''}`}>
              {label}{isUserSide && ' •'}
            </span>
            <span className={`text-sm ${isWinner ? 'font-bold' : ''} ${color === 'emerald' ? 'text-emerald-400/70' : 'text-rose-400/70'}`}>{pct}%</span>
          </div>
          <div className={`h-6 rounded-lg overflow-hidden flex bg-gray-800/50 relative ${isUserSide ? 'ring-1 ring-offset-1 ring-offset-gray-900' : ''}`} style={{ ringColor: color === 'emerald' ? '#34d399' : '#fb7185' }}>
            {distribution.map((count, i) => {
              const segmentPct = barTotal > 0 ? (count / barTotal) * pct : 0;
              if (segmentPct < 0.5) return null;
              return (
                <div key={i} className={`${colors[i]} flex items-center justify-center relative`} style={{ width: `${segmentPct}%` }} />
              );
            })}
            <div className="flex-1" />
          </div>
        </div>
      );
    };
    
    // MC option bar component with confidence gradient
    const MCOptionBar = ({ dist, label, pct, isUser, isWinner, color }) => {
      const optTotal = dist.reduce((a, b) => a + b, 0);
      // Create opacity variants for confidence levels 1-4
      const getColorWithOpacity = (baseColor, level) => {
        const opacities = [0.3, 0.5, 0.75, 1];
        return `${baseColor}${Math.round(opacities[level] * 255).toString(16).padStart(2, '0')}`;
      };
      
      return (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs ${isWinner ? 'font-bold text-white' : 'text-gray-400'} ${isUser ? 'underline' : ''}`}>
              {label}{isUser && ' •'}
            </span>
            <span className={`text-xs ${isWinner ? 'font-bold text-white' : 'text-gray-500'}`}>{pct}%</span>
          </div>
          <div className={`h-5 rounded overflow-hidden flex bg-gray-800/50 ${isUser ? 'ring-1 ring-violet-400' : ''}`}>
            {dist.map((count, i) => {
              const segPct = optTotal > 0 ? (count / optTotal) * pct : 0;
              if (segPct < 0.5) return null;
              return <div key={i} className="h-full" style={{ width: `${segPct}%`, background: getColorWithOpacity(color, i) }} />;
            })}
            <div className="flex-1" />
          </div>
        </div>
      );
    };
    
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const mcColors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={goToSettings} darkMode={darkMode}>
        {hasAnswered ? (
          /* Full screen tappable when answered */
          <div 
            onClick={() => setScreen('categories')}
            className={`flex-1 flex flex-col ${darkMode ? 'text-white bg-gray-950' : 'text-gray-900 bg-gray-100'} text-left cursor-pointer min-h-full`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white/80">←</span>
                  <span className="text-lg">☀️</span>
                  <span className="font-bold text-white">Daily Question</span>
                </div>
                <div className="text-xs text-white/80">{qotdTime.hours}h {qotdTime.minutes}m left</div>
              </div>
            </div>
            
            {/* Sponsor bar */}
            <div className={`flex items-center justify-between px-3 py-1.5 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{qotd.sponsor.avatar}</span>
                <span>{qotd.sponsor.name}</span>
              </div>
              <div className="text-xs text-gray-500">{total.toLocaleString()} responses</div>
            </div>
            
            {/* Question */}
            <div className="flex-1 p-4 flex flex-col">
              <h2 className="text-lg font-semibold leading-snug mb-4">{qotd.text}</h2>
              
              {/* Results */}
              <div className={`rounded-xl p-4 mb-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Results</span>
                  <span className="text-xs text-emerald-400">✓ Recorded</span>
                </div>
                
                {isBinary ? (
                  /* Binary results */
                  results.yesPct >= results.noPct ? (
                    <>
                      <ConfidenceBar distribution={qotd.distribution.yes} color="emerald" label="Yes" pct={results.yesPct} userAnswer={qotdResponse.answer} userConf={qotdResponse.confidence} isWinner={results.yesPct > results.noPct} />
                      <ConfidenceBar distribution={qotd.distribution.no} color="rose" label="No" pct={results.noPct} userAnswer={qotdResponse.answer} userConf={qotdResponse.confidence} isWinner={false} />
                    </>
                  ) : (
                    <>
                      <ConfidenceBar distribution={qotd.distribution.no} color="rose" label="No" pct={results.noPct} userAnswer={qotdResponse.answer} userConf={qotdResponse.confidence} isWinner={true} />
                      <ConfidenceBar distribution={qotd.distribution.yes} color="emerald" label="Yes" pct={results.yesPct} userAnswer={qotdResponse.answer} userConf={qotdResponse.confidence} isWinner={false} />
                    </>
                  )
                ) : (
                  /* MC results - sorted by percentage */
                  [...options].map((opt, i) => ({ opt, i, pct: results.pcts[i], dist: qotd.distribution[i] }))
                    .sort((a, b) => b.pct - a.pct)
                    .map(({ opt, i, pct, dist }) => (
                      <MCOptionBar 
                        key={i}
                        dist={dist}
                        label={`${letters[i]}. ${opt}`}
                        pct={pct}
                        isUser={qotdResponse.answer === i}
                        isWinner={i === results.maxIdx}
                        color={mcColors[i]}
                      />
                    ))
                )}
              </div>
              
              {/* Streak/stats */}
              <div className={`rounded-lg p-3 ${darkMode ? 'bg-emerald-900/20 border border-emerald-500/20' : 'bg-emerald-50'}`}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Daily streak</span>
                  <span className="text-emerald-400 font-bold">🔥 {QOTD_DATA.stats.streak + 1} days</span>
                </div>
              </div>
            </div>
            
            {/* Bottom tap hint */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'} text-center`}>
              <div className="text-emerald-400 font-medium">✓ +{qotd.reward} pts</div>
              <div className="text-xs text-gray-500 mt-1">tap anywhere to continue</div>
            </div>
            {/* Fill remaining space */}
            <div className="flex-1" />
          </div>
        ) : (
          /* Normal interactive state - unanswered */
          <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setScreen('categories')} className="text-white/80">←</button>
                  <span className="text-lg">☀️</span>
                  <span className="font-bold text-white">Daily Question</span>
                </div>
                <div className="text-xs text-white/80">{qotdTime.hours}h {qotdTime.minutes}m left</div>
              </div>
            </div>
            
            {/* Sponsor bar */}
            <div className={`flex items-center justify-between px-3 py-1.5 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{qotd.sponsor.avatar}</span>
                <span>{qotd.sponsor.name}</span>
              </div>
              <div className="text-xs text-gray-500">{total.toLocaleString()} responses</div>
            </div>
            
            {/* Question */}
            <div className="flex-1 p-4 flex flex-col overflow-y-auto">
              <h2 className="text-lg font-semibold leading-snug mb-4">{qotd.text}</h2>
            </div>
            
            {/* Answer area */}
            <div className={`p-3 border-t ${darkMode ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'}`}>
              {qotdPendingSubmit ? (
                <div className="relative">
                  <div className={`py-3 px-4 rounded-xl text-center ${
                    isBinary 
                      ? qotdPendingSubmit.answer === 0 ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-rose-900/30 border border-rose-500/30'
                      : 'bg-violet-900/30 border border-violet-500/30'
                  }`}>
                    <span className={`font-bold ${
                      isBinary 
                        ? qotdPendingSubmit.answer === 0 ? 'text-emerald-400' : 'text-rose-400'
                        : 'text-violet-400'
                    }`}>
                      {isBinary 
                        ? (qotdPendingSubmit.answer === 0 ? 'YES' : 'NO')
                        : `${letters[qotdPendingSubmit.answer]}. ${options[qotdPendingSubmit.answer]}`
                      }
                    </span>
                    <span className="text-gray-400 ml-2">· {CONFIDENCE_LABELS[qotdPendingSubmit.confidence]}</span>
                  </div>
                  <button onClick={cancelQotdSubmit} className="w-full mt-2 py-2 text-xs text-gray-500">Tap to undo</button>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800">
                    <div className="h-full bg-blue-500" style={{ animation: `shrink ${undoDelay}s linear forwards` }} />
                  </div>
                </div>
              ) : isBinary ? (
                /* Binary Yes/No buttons */
                <>
                  <div className="flex gap-2">
                    <button
                      onMouseDown={() => handleQotdTapStart(0)}
                      onMouseUp={() => handleQotdTapEnd(0)}
                      onMouseLeave={handleQotdTapCancel}
                      onTouchStart={() => handleQotdTapStart(0)}
                      onTouchEnd={() => handleQotdTapEnd(0)}
                      onTouchCancel={handleQotdTapCancel}
                      className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all select-none relative overflow-hidden ${
                        qotdTappedAnswer === 0 || qotdHoldingAnswer === 0 ? 'text-white' : 'bg-emerald-900/30 text-emerald-400'
                      }`}
                      style={{
                        background: (qotdTappedAnswer === 0 || qotdHoldingAnswer === 0)
                          ? `linear-gradient(135deg, rgba(16, 185, 129, ${0.3 + (qotdHoldingAnswer === 0 ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount) * 0.175}) 0%, rgba(5, 150, 105, ${0.4 + (qotdHoldingAnswer === 0 ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount) * 0.15}) 100%)`
                          : undefined
                      }}
                    >
                      {qotdHoldingAnswer === 0 && (
                        <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 transition-all" style={{ width: `${qotdHoldProgress * 100}%` }} />
                      )}
                      <span className="relative z-10">YES</span>
                      {(qotdTappedAnswer === 0 || qotdHoldingAnswer === 0) && (
                        <span className="absolute top-2 right-2 text-sm font-bold bg-white/30 w-7 h-7 rounded-full flex items-center justify-center">
                          {qotdHoldingAnswer === 0 ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount}
                        </span>
                      )}
                    </button>
                    <button
                      onMouseDown={() => handleQotdTapStart(1)}
                      onMouseUp={() => handleQotdTapEnd(1)}
                      onMouseLeave={handleQotdTapCancel}
                      onTouchStart={() => handleQotdTapStart(1)}
                      onTouchEnd={() => handleQotdTapEnd(1)}
                      onTouchCancel={handleQotdTapCancel}
                      className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all select-none relative overflow-hidden ${
                        qotdTappedAnswer === 1 || qotdHoldingAnswer === 1 ? 'text-white' : 'bg-rose-900/30 text-rose-400'
                      }`}
                      style={{
                        background: (qotdTappedAnswer === 1 || qotdHoldingAnswer === 1)
                          ? `linear-gradient(135deg, rgba(244, 63, 94, ${0.3 + (qotdHoldingAnswer === 1 ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount) * 0.175}) 0%, rgba(225, 29, 72, ${0.4 + (qotdHoldingAnswer === 1 ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount) * 0.15}) 100%)`
                          : undefined
                      }}
                    >
                      {qotdHoldingAnswer === 1 && (
                        <div className="absolute bottom-0 left-0 h-1 bg-rose-400 transition-all" style={{ width: `${qotdHoldProgress * 100}%` }} />
                      )}
                      <span className="relative z-10">NO</span>
                      {(qotdTappedAnswer === 1 || qotdHoldingAnswer === 1) && (
                        <span className="absolute top-2 right-2 text-sm font-bold bg-white/30 w-7 h-7 rounded-full flex items-center justify-center">
                          {qotdHoldingAnswer === 1 ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount}
                        </span>
                      )}
                    </button>
                  </div>
                  <div className="text-center text-[10px] text-gray-500 mt-2">
                    {(qotdTappedAnswer !== null || qotdHoldingAnswer !== null) 
                      ? <span className="text-gray-400">
                          {CONFIDENCE_LABELS[qotdHoldingAnswer !== null ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount]}
                          <span className="text-gray-600"> · {qotdHoldingAnswer !== null ? 'release' : qotdTapCount < 4 ? 'tap ↑' : 'max'}</span>
                        </span>
                      : 'tap or hold to answer'
                    }
                  </div>
                </>
              ) : (
                /* MC option buttons */
                <>
                  <div className="space-y-2">
                    {options.map((opt, i) => (
                      <button
                        key={i}
                        onMouseDown={() => handleQotdTapStart(i)}
                        onMouseUp={() => handleQotdTapEnd(i)}
                        onMouseLeave={handleQotdTapCancel}
                        onTouchStart={() => handleQotdTapStart(i)}
                        onTouchEnd={() => handleQotdTapEnd(i)}
                        onTouchCancel={handleQotdTapCancel}
                        className={`w-full py-2.5 px-3 rounded-lg text-sm text-left transition-all select-none relative overflow-hidden ${
                          qotdTappedAnswer === i || qotdHoldingAnswer === i ? 'text-white' : 'bg-gray-800 text-gray-300'
                        }`}
                        style={{
                          background: (qotdTappedAnswer === i || qotdHoldingAnswer === i)
                            ? `linear-gradient(135deg, ${mcColors[i]}${Math.round((0.4 + (qotdHoldingAnswer === i ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount) * 0.15) * 255).toString(16)} 0%, ${mcColors[i]}${Math.round((0.6 + (qotdHoldingAnswer === i ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount) * 0.1) * 255).toString(16)} 100%)`
                            : undefined
                        }}
                      >
                        {qotdHoldingAnswer === i && (
                          <div className="absolute bottom-0 left-0 h-0.5 bg-white/50 transition-all" style={{ width: `${qotdHoldProgress * 100}%` }} />
                        )}
                        <span className="font-medium mr-2">{letters[i]}.</span>
                        <span className="relative z-10">{opt}</span>
                        {(qotdTappedAnswer === i || qotdHoldingAnswer === i) && (
                          <span className="absolute top-1/2 -translate-y-1/2 right-2 text-xs font-bold bg-white/30 w-5 h-5 rounded-full flex items-center justify-center">
                            {qotdHoldingAnswer === i ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="text-center text-[10px] text-gray-500 mt-2">
                    {(qotdTappedAnswer !== null || qotdHoldingAnswer !== null) 
                      ? <span className="text-gray-400">
                          {CONFIDENCE_LABELS[qotdHoldingAnswer !== null ? getQotdHoldConfidence(qotdHoldProgress) : qotdTapCount]}
                          <span className="text-gray-600"> · {qotdHoldingAnswer !== null ? 'release' : qotdTapCount < 4 ? 'tap ↑' : 'max'}</span>
                        </span>
                      : 'tap or hold to answer'
                    }
                  </div>
                </>
              )}
              <style>{`
                @keyframes shrink {
                  from { width: 100%; }
                  to { width: 0%; }
                }
              `}</style>
            </div>
          </div>
        )}
      </PhoneFrame>
    );
  }

  // Settings
  if (screen === 'settings') {
    const tipsOn = tipsDismissCount.gestureHint < MAX_TIP_SHOWS;
    
    return (
      <PhoneFrame device={device} onDeviceChange={setDevice} onHome={() => setScreen('categories')} onDoubleClickHome={resetQOTD} onSettings={() => {}} darkMode={darkMode}>
        <div className={`flex-1 flex flex-col ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className={`flex items-center gap-2 px-3 py-2 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <button onClick={() => setScreen(previousScreen)} className="text-gray-400">←</button>
            <span className="font-medium flex-1">Settings</span>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Dark Mode */}
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Appearance</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    {darkMode ? 'Dark mode' : 'Light mode'}
                  </div>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-violet-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}>
                    <span className="flex items-center justify-center h-full text-sm">
                      {darkMode ? '🌙' : '☀️'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Undo Delay */}
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">Undo Delay</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Time to cancel answer
                  </div>
                </div>
                <span className="text-violet-400 font-bold">
                  {undoDelay === 0 ? 'Off' : `${undoDelay}s`}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="0.5"
                value={undoDelay}
                onChange={(e) => setUndoDelay(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Off</span>
                <span>1s</span>
                <span>2s</span>
                <span>3s</span>
              </div>
            </div>
            
            {/* Streak Counter */}
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Streak Counter</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Show 🔥 during play
                  </div>
                </div>
                <button 
                  onClick={() => setShowStreak(!showStreak)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${showStreak ? 'bg-violet-600' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${showStreak ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            
            {/* Show All Tips */}
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Tips</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Display helpful hints
                  </div>
                </div>
                <button 
                  onClick={() => tipsOn ? setTipsDismissCount({ gestureHint: MAX_TIP_SHOWS }) : resetAllTips()}
                  className={`relative w-14 h-8 rounded-full transition-colors ${tipsOn ? 'bg-violet-600' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${tipsOn ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            
            {/* Keyboard Shortcuts */}
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-4`}>
              <div className="font-medium mb-2">Keyboard Shortcuts</div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'} space-y-1`}>
                <div className="flex justify-between"><span>Yes / No</span><span className="font-mono">Y N</span></div>
                <div className="flex justify-between"><span>MC options</span><span className="font-mono">A B C D E</span></div>
                <div className="flex justify-between"><span>Navigate</span><span className="font-mono">← →</span></div>
                <div className="flex justify-between"><span>Skip / Save</span><span className="font-mono">S M</span></div>
                <div className="flex justify-between"><span>Undo</span><span className="font-mono">Esc</span></div>
              </div>
            </div>
            
            {/* Info */}
            <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'} text-center mt-4`}>
              <p>Aura Player a1.6</p>
              <p className="mt-1">Tap/hold to set confidence (1-4)</p>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return null;
}
