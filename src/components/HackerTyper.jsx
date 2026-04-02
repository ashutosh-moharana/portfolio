import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// A massive string of real-looking code for that authentic hacker feel.
const FAKE_CODE = `/* 
 * --------------------------------------------------------------
 * SYSTEM BOOT SEQUENCE INITIATED...
 * LOADING KERNEL MODULES... 
 * --------------------------------------------------------------
 */

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/sched.h>
#include <linux/syscalls.h>
#include <asm/uaccess.h>

#define SYS_CALL_TABLE_ADDR 0xffffffff81a00200

unsigned long **sys_call_table = (unsigned long **)SYS_CALL_TABLE_ADDR;
asmlinkage long (*original_sys_open)(const char __user *filename, int flags, umode_t mode);

asmlinkage long hacked_sys_open(const char __user *filename, int flags, umode_t mode) {
    printk(KERN_INFO "OVERRIDE: Intercepted sys_open call -> %s\\n", filename);
    return original_sys_open(filename, flags, mode);
}

static int __init hacker_init(void) {
    printk(KERN_INFO ">> INJECTING PAYLOAD...\\n");
    
    // Disable write protection
    write_cr0(read_cr0() & (~0x10000));
    
    original_sys_open = (void *)sys_call_table[__NR_open];
    sys_call_table[__NR_open] = (unsigned long *)hacked_sys_open;
    
    // Enable write protection
    write_cr0(read_cr0() | 0x10000);
    
    printk(KERN_INFO ">> SYSTEM COMPROMISED.\\n");
    return 0;
}

static void __exit hacker_exit(void) {
    // Restore original syscall
    write_cr0(read_cr0() & (~0x10000));
    sys_call_table[__NR_open] = (unsigned long *)original_sys_open;
    write_cr0(read_cr0() | 0x10000);
    
    printk(KERN_INFO ">> TRACES DELETED.\\n");
}

module_init(hacker_init);
module_exit(hacker_exit);

/*
 * CONNECTING TO SECURE SERVER...
 * BYPASSING FIREWALL...
 * ACCESS GRANTED.
 */

const decryptSource = async (targetIp, port) => {
    console.log('[*] Initializing quantum decryption...');
    const buffer = Buffer.alloc(4096);
    let offset = 0;
    
    while(offset < buffer.length) {
        let chunk = await executePayload(targetIp);
        buffer.write(chunk, offset);
        offset += chunk.length;
        console.log(\`[+] Decrypted \${offset} bytes...\`);
    }
    
    return buffer.toString('utf-8');
};

function autoExploit() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            console.warn(\`[WARNING] UNAUTHORIZED ACCESS DETECTED AT PORT \${Math.floor(Math.random()*8000)}\`);
        }, i * 50);
    }
}

// INITIATING NEURAL OVERRIDE...
import React, { useMemo } from 'react';
import { createStore } from 'redux';

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HACK_THE_PLANET':
      return { ...state, compromised: true, data: action.payload };
    default:
      return state;
  }
};

const store = createStore(rootReducer);
store.dispatch({ type: 'HACK_THE_PLANET', payload: 'SYSTEM TAKEOVER COMPLETE' });

console.log("Welcome to the Matrix.");
// EOF
`;

const HackerTyper = () => {
  const [typedChars, setTypedChars] = useState(0);
  const [phase, setPhase] = useState("connecting"); // connecting, auto_typing, ready
  const [dummyInput, setDummyInput] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const AUTO_STOP_INDEX = FAKE_CODE.indexOf("*/") + 3;

  useEffect(() => {
    if (phase === "connecting") {
      const timer = setTimeout(() => {
        setPhase("auto_typing");
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (phase === "auto_typing") {
      const interval = setInterval(() => {
        setTypedChars((prev) => {
          const charCount = Math.floor(Math.random() * 8) + 4;
          const nextCount = prev + charCount;
          if (nextCount >= AUTO_STOP_INDEX) {
            clearInterval(interval);
            setPhase("ready");
            return AUTO_STOP_INDEX;
          }
          return nextCount;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [phase, AUTO_STOP_INDEX]);

  // Keep the focus on invisible input when ready
  useEffect(() => {
    if (phase === "ready" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  const handleUserTyping = (e) => {
    setDummyInput(""); // keep it empty
    if (phase !== "ready") return;
    
    setTypedChars((prev) => {
      const charCount = Math.floor(Math.random() * 4) + 4;
      const nextCount = prev + charCount;
      if (nextCount >= FAKE_CODE.length) return 0;
      return nextCount;
    });
  };

  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (phase !== "ready") return;
      if (e.ctrlKey || e.altKey || e.metaKey || e.key === "Escape") return;
      e.preventDefault(); // Stop normal typing behavior
      // Focus the input if they just start typing without explicitly clicking
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
      handleUserTyping(e);
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [phase]);

  // Auto-scroll to bottom seamlessly
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [typedChars]);

  const outputText = FAKE_CODE.substring(0, typedChars);

  return (
    <div 
      className="fixed inset-0 bg-[#09090b] z-50 overflow-hidden flex flex-col font-mono text-primary antialiased"
      onClick={() => phase === "ready" && inputRef.current?.focus()}
    >

      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 md:p-10 pb-[50vh] whitespace-pre-wrap break-all text-sm md:text-base leading-relaxed scrollbar-hide z-20"
      >
        {outputText}
        {phase !== "connecting" && (
          <span 
            className="animate-pulse inline-block w-2.5 h-5 align-middle ml-1 bg-primary" 
          />
        )}
        
        {phase === "ready" && (
          <textarea
            ref={inputRef}
            value={dummyInput}
            onChange={handleUserTyping}
            className="opacity-0 w-[1px] h-[1px] p-0 m-0 border-none outline-none overflow-hidden block"
            autoFocus
            spellCheck="false"
            autoComplete="off"
            style={{ fontSize: "16px" }}
          />
        )}
      </div>
      
      {/* Exit Button - clear and consistently placed to avoid keyboard overlaps */}
      <button 
        onClick={() => navigate("/")}
        className="fixed top-4 right-4 md:top-8 md:right-8 bg-background/90 text-primary border border-primary/50 hover:bg-primary/20 hover:scale-105 active:scale-95 px-4 py-2 text-xs uppercase tracking-widest transition-all z-[70] backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        [ EXIT SYSTEM ]
      </button>
      
      {phase === "connecting" && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-50">
           <p className="text-xl md:text-3xl text-center px-4 mb-4 font-bold tracking-widest border border-primary/50 p-4 bg-primary/10">
            CONNECTION ESTABLISHED
          </p>
        </div>
      )}
    </div>
  );
};

export default HackerTyper;
