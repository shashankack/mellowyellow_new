import React, { useEffect, useRef, useCallback } from 'react';
import { Noise } from 'noisejs';
import "../styles/waves.scss";
import { useColor } from '../context/ColorContext';

const WaveBackground = () => {
  const { theme } = useColor();
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const pathsRef = useRef([]);
  const linesRef = useRef([]);
  const boundingRef = useRef({ width: 0, height: 0 });
  const noiseRef = useRef(new Noise(Math.random()));
  
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: true,
  });

  const setSize = useCallback(() => {
    if (containerRef.current) {
      boundingRef.current = containerRef.current.getBoundingClientRect();
      if (svgRef.current) {
        svgRef.current.style.width = `${boundingRef.current.width}px`;
        svgRef.current.style.height = `${boundingRef.current.height}px`;
      }
    }
  }, []);

  const initLines = useCallback(() => {
    if (!svgRef.current || !boundingRef.current.width) return;

    const { width, height } = boundingRef.current;

    // Clear existing paths
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    pathsRef.current = [];
    linesRef.current = [];

    const xGap = 10;
    const yGap = 32;
    const oWidth = width + 200;
    const oHeight = height + 30;
    const totalLines = Math.ceil(oWidth / xGap);
    const totalPoints = Math.ceil(oHeight / yGap);
    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;

    for (let i = 0; i <= totalLines; i++) {
      const points = [];

      for (let j = 0; j <= totalPoints; j++) {
        points.push({
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        });
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.classList.add('a__line');
      path.classList.add('js-line');
      svgRef.current.appendChild(path);
      pathsRef.current.push(path);
      linesRef.current.push(points);
    }
  }, []);

  const updateMousePosition = useCallback((x, y) => {
    const mouse = mouseRef.current;
    const bounds = containerRef.current.getBoundingClientRect();

    mouse.x = x - bounds.left;
    mouse.y = y - bounds.top;
    

    if (!mouse.set) {
      mouse.sx = mouse.x;
      mouse.sy = mouse.y;
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.set = true;
    }
  }, []);

  const moved = useCallback((point, withCursorForce = true) => ({
    x: Math.round((point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0)) * 10) / 10,
    y: Math.round((point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0)) * 10) / 10,
  }), []);

  const movePoints = useCallback((time) => {
    const mouse = mouseRef.current;
    
    linesRef.current.forEach((points) => {
      points.forEach((p) => {
        const move = noiseRef.current.perlin2(
          (p.x + time * 0.0125) * 0.002,
          (p.y + time * 0.005) * 0.0015
        ) * 12;
        
        p.wave.x = Math.cos(move) * 32;
        p.wave.y = Math.sin(move) * 16;

        const dx = p.x - mouse.sx;
        const dy = p.y - mouse.sy;
        const d = Math.hypot(dx, dy);
        const l = Math.max(175, mouse.vs);

        if (d < l) {
          const s = 1 - d / l;
          const f = Math.cos(d * 0.001) * s;
          const force = f * l * mouse.vs * 0.00065;

          p.cursor.vx += Math.cos(mouse.a) * force;
          p.cursor.vy += Math.sin(mouse.a) * force;
        }

        p.cursor.vx += (0 - p.cursor.x) * 0.005;
        p.cursor.vy += (0 - p.cursor.y) * 0.005;
        p.cursor.vx *= 0.925;
        p.cursor.vy *= 0.925;
        p.cursor.x += p.cursor.vx * 2;
        p.cursor.y += p.cursor.vy * 2;
        p.cursor.x = Math.min(100, Math.max(-100, p.cursor.x));
        p.cursor.y = Math.min(100, Math.max(-100, p.cursor.y));
      });
    });
  }, []);

  const drawLines = useCallback(() => {
    linesRef.current.forEach((points, lIndex) => {
      const path = pathsRef.current[lIndex];
      if (!path) return;

      let p1 = moved(points[0], false);
      let d = `M ${p1.x} ${p1.y}`;

      points.forEach((point, pIndex) => {
        const isLast = pIndex === points.length - 1;
        p1 = moved(point, !isLast);
        d += `L ${p1.x} ${p1.y}`;
      });

      path.setAttribute('d', d);
    });
  }, [moved]);

  const tick = useCallback((time) => {
    const mouse = mouseRef.current;

    mouse.sx += (mouse.x - mouse.sx) * 0.1;
    mouse.sy += (mouse.y - mouse.sy) * 0.1;

    const dx = mouse.x - mouse.lx;
    const dy = mouse.y - mouse.ly;
    const d = Math.hypot(dx, dy);

    mouse.v = d;
    mouse.vs += (d - mouse.vs) * 0.1;
    mouse.vs = Math.min(100, mouse.vs);

    mouse.lx = mouse.x;
    mouse.ly = mouse.y;
    mouse.a = Math.atan2(dy, dx);

    if (containerRef.current) {
      containerRef.current.style.setProperty('--x', `${mouse.sx}px`);
      containerRef.current.style.setProperty('--y', `${mouse.sy}px`);
    }

    movePoints(time);
    drawLines();
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [movePoints, drawLines]);

  useEffect(() => {
    setSize();
    initLines();

    const handleResize = () => {
      setSize();
      initLines();
    };

    const handleMouseMove = (e) => {
      updateMousePosition(e.pageX, e.pageY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      updateMousePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('touchmove', handleTouchMove);

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [setSize, initLines, updateMousePosition, tick]);

  return (
    <div ref={containerRef} className="waves" style={{ stroke: theme.backgroundColor }}>
      <svg ref={svgRef} className="waves__svg"></svg>
    </div>
  );
};

export default WaveBackground;