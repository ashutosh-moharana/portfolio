import { useEffect, useRef } from "react";

const BackendBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNetwork();
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { 
                x: (e.clientX - window.innerWidth / 2) / 30, // Sensitivity
                y: (e.clientY - window.innerHeight / 2) / 30 
            };
        };

        // --- Network Logic ---
        let nodes = [];
        let pulses = [];
        const isMobile = window.innerWidth < 768;

        const initNetwork = () => {
            nodes = [];
            pulses = [];
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 + (isMobile ? 64 : 0);
            
            // Central Core Nodes (The Ring Evolution)
            for (let i = 0; i < 4; i++) {
               nodes.push({
                   x: centerX,
                   y: centerY,
                   targetX: centerX,
                   targetY: centerY,
                   size: 0,
                   type: 'core',
                   depth: 0,
                   connections: []
               });
            }

            // Global Background Nodes ("The Something")
            const nodeCount = isMobile ? 30 : 70;
            for (let i = 0; i < nodeCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 200 + Math.random() * (Math.max(canvas.width, canvas.height) / 2);
                const nx = centerX + Math.cos(angle) * dist;
                const ny = centerY + Math.sin(angle) * dist;
                
                nodes.push({
                    x: nx,
                    y: ny,
                    targetX: nx,
                    targetY: ny,
                    size: 1 + Math.random() * 2,
                    type: 'data',
                    depth: 0.1 + Math.random() * 0.8, // For Parallax
                    connections: []
                });
            }

            // Create connections (Network Topology)
            nodes.forEach((node, i) => {
               if (node.type === 'core') return;
               
               // Connect to a few nearby nodes or core
               const neighbors = nodes
                   .map((n, idx) => ({ idx, dist: Math.hypot(node.x - n.x, node.y - n.y) }))
                   .sort((a, b) => a.dist - b.dist)
                   .slice(1, 4); // 3 nearest

               neighbors.forEach(neighbor => {
                   node.connections.push(neighbor.idx);
               });
               
               // High chance to connect back toward core center
               if (Math.random() > 0.5) {
                   node.connections.push(Math.floor(Math.random() * 4)); 
               }
            });

            // Initial pulses
            const pulseCount = isMobile ? 20 : 50;
            for (let i = 0; i < pulseCount; i++) spawnPulse();
        };

        const spawnPulse = () => {
            const startNodeIdx = Math.floor(Math.random() * nodes.length);
            const node = nodes[startNodeIdx];
            if (node && node.connections.length > 0) {
                const targetNodeIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
                pulses.push({
                    sourceIdx: startNodeIdx,
                    targetIdx: targetNodeIdx,
                    dist: 0,
                    speed: 0.002 + Math.random() * 0.005, // Slow calm packets
                });
            }
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#ed1d24";
            
            const { x: mx, y: my } = mouseRef.current;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 + (isMobile ? 64 : 0);

            // DRAW DATA NETWORK (The Background)
            ctx.beginPath();
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.1;

            nodes.forEach((node, idx) => {
                const px = node.targetX + mx * node.depth;
                const py = node.targetY + my * node.depth;
                node.x = px;
                node.y = py;

                if (node.type === 'data') {
                    node.connections.forEach(connIdx => {
                        const target = nodes[connIdx];
                        ctx.moveTo(px, py);
                        ctx.lineTo(target.x, target.y);
                    });
                }
            });
            ctx.stroke();

            // DRAW CORE HUD (The Upgraded Ring)
            ctx.globalAlpha = 1.0;
            const breathe = Math.sin(time / 1000) * 0.1 + 1.0;

            // Core HUD Arcs
            [0.6, 0.8, 1.25].forEach((speedMult, i) => {
                const radius = (isMobile ? 140 : 260) + i * 25;
                ctx.beginPath();
                ctx.strokeStyle = primaryColor;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.2;
                
                const rotation = (time / 5000) * (i % 2 === 0 ? 1 : -1) * speedMult;
                ctx.arc(centerX + mx * 0.1, centerY + my * 0.1, radius * breathe, rotation, rotation + Math.PI / 2);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(centerX + mx * 0.1, centerY + my * 0.1, radius * breathe, rotation + Math.PI, rotation + 1.5 * Math.PI);
                ctx.stroke();
            });

            // DRAW MOVING DATA PACKETS (The Lights)
            pulses.forEach((p, idx) => {
                const source = nodes[p.sourceIdx];
                const target = nodes[p.targetIdx];
                if (!source || !target) return;

                const x = source.x + (target.x - source.x) * p.dist;
                const y = source.y + (target.y - source.y) * p.dist;

                ctx.globalAlpha = 0.6;
                ctx.fillStyle = primaryColor;
                ctx.beginPath();
                ctx.arc(x, y, isMobile ? 1.5 : 2.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Small glow
                ctx.globalAlpha = 0.2;
                ctx.beginPath();
                ctx.arc(x, y, isMobile ? 4 : 6, 0, Math.PI * 2);
                ctx.fill();

                p.dist += p.speed;
                if (p.dist >= 1) {
                    pulses.splice(idx, 1);
                    spawnPulse();
                }
            });

            // DRAW CORE BREATHING ENERGY
            ctx.globalAlpha = 0.15;
            const grad = ctx.createRadialGradient(centerX + mx * 0.1, centerY + my * 0.1, 0, centerX + mx * 0.1, centerY + my * 0.1, isMobile ? 120 : 240);
            grad.addColorStop(0, primaryColor);
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(centerX + mx * 0.1, centerY + my * 0.1, (isMobile ? 120 : 240) * breathe, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        resizeCanvas();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ 
                filter: "blur(0.2px)",
                maskImage: "radial-gradient(circle at center, black 0%, black 70%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 70%, transparent 100%)"
            }}
        />
    );
};

export default BackendBackground;
