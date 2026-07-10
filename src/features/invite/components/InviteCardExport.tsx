import { forwardRef } from "react"
import { EVENT } from "../constants"
import { EXPORT_WIDTH, EXPORT_HEIGHT } from "../utils/exportHelpers"

interface InviteCardExportProps {
  guestName: string
}

const InviteCardExport = forwardRef<HTMLDivElement, InviteCardExportProps>(
  function InviteCardExport({ guestName }, ref) {
    return (
      <div
        ref={ref}
        style={{
          width: EXPORT_WIDTH,
          height: EXPORT_HEIGHT,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 16,
          background: "#FFF8F2",
        }}
      >
        {/* TOP: image — 450px (50%) */}
        <div style={{ position: "relative", width: "100%", height: 450, flexShrink: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${EVENT.bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
            }}
          />
          {/* subtle dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
          {/* fade bottom of image into cream */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 80,
              background: "linear-gradient(to bottom, transparent, #FFF8F2)",
            }}
          />
          {/* school name pill */}
          <div style={{ position: "absolute", top: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-be-vietnam), sans-serif",
                color: "#fff",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: "rgba(0,0,0,0.32)",
                borderRadius: 999,
                padding: "5px 20px",
              }}
            >
              {EVENT.school}
            </span>
          </div>
        </div>

        {/* BOTTOM: content — flex: 1 fills remaining 450px */}
        <div
          style={{
            flex: 1,
            background: "#FFF8F2",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 48px",
            gap: 12,
            textAlign: "center",
          }}
        >
          {/* Host */}
          <div>
            <p style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 14, color: "#B08060", margin: "0 0 4px" }}>
              {EVENT.degree}
            </p>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: 28, color: "#3D2B1F", margin: 0, lineHeight: 1.2 }}>
              {EVENT.hostName}
            </p>
          </div>

          {/* Amber divider */}
          <div style={{ width: 48, height: 2, background: "#FFB347", flexShrink: 0 }} />

          {/* Guest */}
          <div>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: 16, color: "#7A5C45", margin: "0 0 8px" }}>
              Xin trân trọng kính mời
            </p>
            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: 44,
                color: "#3D2B1F",
                margin: "0 0 6px",
                lineHeight: 1.2,
                borderBottom: "2px solid #FFB347",
                paddingBottom: 4,
              }}
            >
              {guestName}
            </p>
            <p style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 15, color: "#7A5C45", margin: 0 }}>
              đến tham dự Lễ Tốt Nghiệp
            </p>
          </div>

          {/* Date/time */}
          <p style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontWeight: 600, fontSize: 17, color: "#3D2B1F", margin: "4px 0 0", textAlign: "center" }}>
            {EVENT.displayDatetime}
          </p>

          {/* Address — plain text, no link */}
          <p style={{ fontFamily: "var(--font-be-vietnam), sans-serif", fontSize: 13, color: "#7A5C45", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
            {EVENT.venue}
          </p>
        </div>
      </div>
    )
  }
)

export default InviteCardExport
