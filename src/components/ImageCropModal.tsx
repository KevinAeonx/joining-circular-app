"use client";
import { useState, useRef, useCallback, useEffect } from "react";

interface Props {
  imageSrc: string;
  onCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
  /** "circle" (default, used by Joining) or "rect" (used by Birthday/Anniversary) */
  shape?: "circle" | "rect";
  /** width/height ratio for rect mode — defaults to 210/255 (portrait card frame) */
  aspectRatio?: number;
}

const CONTAINER_W = 480;
const CONTAINER_H = 400;

export default function ImageCropModal({
  imageSrc, onCrop, onCancel,
  shape = "circle",
  aspectRatio = 210 / 255,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [displaySize, setDisplaySize] = useState({ w: CONTAINER_W, h: CONTAINER_H });

  // ── Circle state (used when shape="circle") ──
  const [circle, setCircle] = useState({ cx: CONTAINER_W / 2, cy: CONTAINER_H / 2, r: 120 });

  // ── Rect state (used when shape="rect") ──
  const [rect, setRect] = useState({ x: 60, y: 30, w: 160, h: 160 / aspectRatio });

  const dragging = useRef(false);
  const resizing = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, cx: 0, cy: 0, rx: 0, ry: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, r: 0, rw: 0 });

  const circleRef = useRef(circle);
  circleRef.current = circle;
  const rectRef = useRef(rect);
  rectRef.current = rect;
  const displayRef = useRef(displaySize);
  displayRef.current = displaySize;

  const onImgLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const scaleX = CONTAINER_W / img.naturalWidth;
    const scaleY = CONTAINER_H / img.naturalHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    const dw = Math.round(img.naturalWidth * scale);
    const dh = Math.round(img.naturalHeight * scale);
    setDisplaySize({ w: dw, h: dh });

    if (shape === "circle") {
      const r = Math.round(Math.min(dw, dh) * 0.4);
      setCircle({ cx: dw / 2, cy: dh / 2, r });
    } else {
      // Initial rect: 70% of display width, height locked to aspectRatio
      const w = Math.round(dw * 0.70);
      const h = Math.round(w / aspectRatio);
      const x = Math.round((dw - w) / 2);
      const y = Math.round((dh - h) / 2);
      setRect({ x, y, w, h: Math.min(h, dh - y) });
    }
  };

  // ── Circle drag/resize ──
  const onCircleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dragging.current = true;
    dragStart.current = { ...dragStart.current, mx: e.clientX, my: e.clientY, cx: circleRef.current.cx, cy: circleRef.current.cy };
  };
  const onResizeCircleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { ...resizeStart.current, mx: e.clientX, my: e.clientY, r: circleRef.current.r };
  };

  // ── Rect drag/resize ──
  const onRectMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    dragging.current = true;
    dragStart.current = { ...dragStart.current, mx: e.clientX, my: e.clientY, rx: rectRef.current.x, ry: rectRef.current.y };
  };
  const onResizeRectMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { ...resizeStart.current, mx: e.clientX, my: e.clientY, rw: rectRef.current.w };
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    const { w, h } = displayRef.current;
    if (shape === "circle") {
      if (dragging.current) {
        const dx = e.clientX - dragStart.current.mx;
        const dy = e.clientY - dragStart.current.my;
        setCircle(prev => ({
          ...prev,
          cx: Math.max(prev.r, Math.min(w - prev.r, dragStart.current.cx + dx)),
          cy: Math.max(prev.r, Math.min(h - prev.r, dragStart.current.cy + dy)),
        }));
      }
      if (resizing.current) {
        const dx = e.clientX - resizeStart.current.mx;
        const dy = e.clientY - resizeStart.current.my;
        const sign = dx + dy >= 0 ? 1 : -1;
        const delta = sign * Math.sqrt(dx * dx + dy * dy);
        setCircle(prev => {
          const maxR = Math.min(prev.cx, w - prev.cx, prev.cy, h - prev.cy);
          const newR = Math.max(30, Math.min(maxR, resizeStart.current.r + delta));
          return { ...prev, r: newR };
        });
      }
    } else {
      if (dragging.current) {
        const dx = e.clientX - dragStart.current.mx;
        const dy = e.clientY - dragStart.current.my;
        setRect(prev => ({
          ...prev,
          x: Math.max(0, Math.min(w - prev.w, dragStart.current.rx + dx)),
          y: Math.max(0, Math.min(h - prev.h, dragStart.current.ry + dy)),
        }));
      }
      if (resizing.current) {
        const dx = e.clientX - resizeStart.current.mx;
        const newW = Math.max(50, resizeStart.current.rw + dx);
        setRect(prev => {
          const clampedW = Math.min(newW, w - prev.x);
          const clampedH = clampedW / aspectRatio;
          if (prev.y + clampedH > h) return prev;
          return { ...prev, w: clampedW, h: clampedH };
        });
      }
    }
  }, [shape, aspectRatio]);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    resizing.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const handleCrop = () => {
    const img = imgRef.current;
    if (!img) return;
    const scaleX = img.naturalWidth / displaySize.w;
    const scaleY = img.naturalHeight / displaySize.h;

    if (shape === "circle") {
      const scale = Math.min(scaleX, scaleY);
      const natCx = circle.cx * scaleX;
      const natCy = circle.cy * scaleY;
      const natR = circle.r * scale;
      const size = Math.round(natR * 2);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.beginPath();
      ctx.arc(natR, natR, natR, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, natCx - natR, natCy - natR, size, size, 0, 0, size, size);
      onCrop(canvas.toDataURL("image/png"));
    } else {
      const natX = rect.x * scaleX;
      const natY = rect.y * scaleY;
      const natW = rect.w * scaleX;
      const natH = rect.h * scaleY;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(natW);
      canvas.height = Math.round(natH);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, natX, natY, natW, natH, 0, 0, canvas.width, canvas.height);
      onCrop(canvas.toDataURL("image/png"));
    }
  };

  // Resize handle position
  const circleHandleX = circle.cx + circle.r * Math.cos(Math.PI / 4);
  const circleHandleY = circle.cy + circle.r * Math.sin(Math.PI / 4);
  const rectHandleX = rect.x + rect.w;
  const rectHandleY = rect.y + rect.h;

  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.72)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#fff", borderRadius: "16px", padding: "24px",
        boxShadow: "0 8px 48px rgba(0,0,0,0.35)", maxWidth: "560px", width: "100%", margin: "0 16px",
      }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700, color: "#1a1a1a" }}>
          Crop Profile Photo
        </h3>

        <div style={{
          width: displaySize.w, height: displaySize.h,
          position: "relative", margin: "0 auto",
          userSelect: "none", touchAction: "none",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={imageSrc}
            alt="crop source"
            onLoad={onImgLoad}
            draggable={false}
            style={{ width: displaySize.w, height: displaySize.h, display: "block", userSelect: "none" }}
          />

          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            viewBox={`0 0 ${displaySize.w} ${displaySize.h}`}
          >
            <defs>
              <mask id="crop-mask">
                <rect width={displaySize.w} height={displaySize.h} fill="white" />
                {shape === "circle"
                  ? <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill="black" />
                  : <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill="black" />
                }
              </mask>
            </defs>

            {/* Dark overlay with hole */}
            <rect width={displaySize.w} height={displaySize.h}
              fill="rgba(0,0,0,0.52)" mask="url(#crop-mask)" />

            {shape === "circle" ? (
              <>
                <circle
                  cx={circle.cx} cy={circle.cy} r={circle.r}
                  fill="transparent" stroke="white" strokeWidth="2" strokeDasharray="6 3"
                  style={{ cursor: "grab" }}
                  onMouseDown={onCircleMouseDown}
                />
                <circle cx={circleHandleX} cy={circleHandleY} r={9}
                  fill="white" stroke="#C94000" strokeWidth="2.5"
                  style={{ cursor: "nwse-resize" }}
                  onMouseDown={onResizeCircleMouseDown}
                />
                <line x1={circleHandleX - 4} y1={circleHandleY - 4} x2={circleHandleX + 4} y2={circleHandleY + 4}
                  stroke="#C94000" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
                <line x1={circleHandleX + 4} y1={circleHandleY - 4} x2={circleHandleX - 4} y2={circleHandleY + 4}
                  stroke="#C94000" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
              </>
            ) : (
              <>
                {/* Dashed rect border — drag to move */}
                <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h}
                  fill="transparent" stroke="white" strokeWidth="2" strokeDasharray="6 3"
                  style={{ cursor: "grab" }}
                  onMouseDown={onRectMouseDown}
                />
                {/* Corner guides */}
                {[
                  [rect.x, rect.y], [rect.x + rect.w, rect.y],
                  [rect.x, rect.y + rect.h], [rect.x + rect.w, rect.y + rect.h],
                ].map(([cx, cy], i) => (
                  <rect key={i} x={cx - 6} y={cy - 6} width={12} height={12}
                    fill="white" rx={2} style={{ pointerEvents: "none" }} />
                ))}
                {/* Resize handle at bottom-right */}
                <circle cx={rectHandleX} cy={rectHandleY} r={9}
                  fill="white" stroke="#C94000" strokeWidth="2.5"
                  style={{ cursor: "nwse-resize" }}
                  onMouseDown={onResizeRectMouseDown}
                />
                <line x1={rectHandleX - 4} y1={rectHandleY - 4} x2={rectHandleX + 4} y2={rectHandleY + 4}
                  stroke="#C94000" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
                <line x1={rectHandleX + 4} y1={rectHandleY - 4} x2={rectHandleX - 4} y2={rectHandleY + 4}
                  stroke="#C94000" strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
              </>
            )}
          </svg>
        </div>

        <p style={{ fontSize: "12px", color: "#999", marginTop: "10px", textAlign: "center" }}>
          {shape === "circle"
            ? "Drag the circle to reposition\u00a0·\u00a0Drag the handle to resize"
            : "Drag the box to reposition\u00a0·\u00a0Drag the corner handle to resize"
          }
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "18px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{
            padding: "8px 22px", borderRadius: "8px", border: "1px solid #ddd",
            backgroundColor: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 500,
          }}>
            Cancel
          </button>
          <button onClick={handleCrop} style={{
            padding: "8px 22px", borderRadius: "8px", border: "none",
            backgroundColor: "#C94000", color: "#fff", cursor: "pointer",
            fontSize: "14px", fontWeight: 700,
          }}>
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
