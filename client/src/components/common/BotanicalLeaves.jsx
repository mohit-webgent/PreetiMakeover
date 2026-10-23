import React from 'react';

/**
 * BotanicalLeaves - Elegant botanical watermark leaves extracted from Hero section.
 * Can be placed in any relative section or page to create luxury salon ambience.
 */
export default function BotanicalLeaves({ variant = 'all', className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`} aria-hidden="true">
      {/* 1. Top-Left: Delicate Eucalyptus Branch */}
      {(variant === 'all' || variant === 'corners' || variant === 'top-left' || variant === 'left') && (
        <div className="absolute -top-6 -left-6 sm:-top-2 sm:-left-2 w-52 h-52 sm:w-64 sm:h-64 text-salon-gold opacity-[0.22]">
          <svg viewBox="0 0 360 360" fill="none" className="w-full h-full">
            <path
              d="M10 10 C50 40, 85 90, 130 150 C170 205, 220 260, 310 320"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path d="M55 52 C45 48, 38 42, 32 38" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M32 38 C20 22, 6 28, 2 38 C-2 52, 14 62, 32 38 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M32 38 C18 34, 10 35, 2 38" stroke="currentColor" strokeWidth="0.7" />
            <path d="M24 36 C20 30, 16 28, 14 26" stroke="currentColor" strokeWidth="0.5" />
            <path d="M20 37 C18 43, 14 47, 10 49" stroke="currentColor" strokeWidth="0.5" />

            <path d="M68 68 C80 62, 90 58, 98 56" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M98 56 C115 45, 130 52, 134 65 C136 78, 118 84, 98 56 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M98 56 C114 60, 126 62, 134 65" stroke="currentColor" strokeWidth="0.7" />

            <path d="M98 108 C85 100, 72 96, 60 92" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M60 92 C40 76, 22 84, 16 98 C12 114, 34 122, 60 92 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M60 92 C38 92, 26 95, 16 98" stroke="currentColor" strokeWidth="0.7" />

            <path d="M118 132 C132 124, 146 118, 158 116" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M158 116 C180 102, 198 110, 204 124 C206 140, 184 146, 158 116 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M158 116 C180 120, 194 122, 204 124" stroke="currentColor" strokeWidth="0.7" />

            <path d="M152 178 C135 168, 120 162, 105 158" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M105 158 C80 140, 62 148, 54 164 C48 182, 74 192, 105 158 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />

            <path d="M178 206 C195 196, 212 190, 226 188" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M226 188 C252 172, 274 182, 280 198 C282 216, 256 222, 226 188 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />

            <path d="M218 252 C200 242, 185 238, 172 235" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M172 235 C150 218, 134 225, 126 240 C120 256, 144 265, 172 235 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />

            <path d="M248 276 C264 266, 278 262, 290 260" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M290 260 C314 246, 332 254, 338 268 C340 282, 318 288, 290 260 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />

            <path d="M310 320 C324 330, 334 338, 330 342 C320 345, 308 335, 310 320 Z" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </div>
      )}

      {/* 2. Top-Right: Realistic Arching Palm Frond */}
      {(variant === 'all' || variant === 'corners' || variant === 'top-right' || variant === 'right') && (
        <div className="absolute -top-12 -right-6 sm:right-[0%] w-72 h-[380px] sm:w-[360px] sm:h-[440px] text-salon-gold opacity-[0.20] rotate-[18deg]">
          <svg viewBox="0 0 380 500" fill="none" className="w-full h-full">
            <path
              d="M30 480 C100 360, 180 220, 270 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M50 440 C20 410, 8 380, 2 350 C24 370, 48 395, 74 415" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M78 392 C38 358, 16 325, 10 290 C34 315, 66 348, 98 368" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M106 342 C56 302, 28 265, 20 225 C48 252, 84 290, 122 314" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M136 290 C78 245, 48 205, 42 165 C68 195, 110 238, 148 260" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M166 236 C112 188, 80 148, 76 108 C102 138, 142 182, 176 206" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M196 180 C150 132, 120 95, 122 55 C142 85, 176 128, 204 150" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M226 124 C190 80, 170 48, 178 15 C190 45, 214 82, 234 100" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />

            <path d="M72 448 C118 440, 160 428, 192 410 C162 426, 124 440, 92 436" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M102 398 C158 386, 206 368, 242 344 C204 366, 156 384, 122 390" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M132 344 C192 328, 246 304, 286 272 C246 298, 194 322, 150 332" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M164 288 C226 268, 276 238, 314 200 C274 232, 222 260, 180 274" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M196 230 C254 205, 300 170, 332 128 C298 162, 250 194, 210 210" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M224 170 C270 142, 308 106, 330 68 C304 98, 266 128, 234 148" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M246 112 C280 84, 308 52, 320 18 C300 46, 272 74, 252 92" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* 3. Bottom-Left: Monstera Watermark */}
      {(variant === 'all' || variant === 'corners' || variant === 'bottom-left' || variant === 'left') && (
        <div className="absolute -bottom-10 -left-4 sm:bottom-0 sm:left-[2%] w-48 h-56 sm:w-56 sm:h-64 text-salon-rose-dark opacity-[0.16] -rotate-[12deg]">
          <svg viewBox="0 0 280 340" fill="none" className="w-full h-full">
            <path
              d="M140 330 C138 270, 139 160, 140 25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M140 25
                 C160 30, 185 45, 210 70
                 C190 82, 170 85, 155 82
                 C175 95, 215 105, 235 130
                 C208 138, 185 132, 168 126
                 C192 145, 232 165, 245 200
                 C218 202, 195 190, 178 180
                 C200 205, 228 238, 220 270
                 C205 285, 180 288, 162 278
                 C170 295, 162 315, 140 325
                 C118 315, 110 295, 118 278
                 C100 288, 75 285, 60 270
                 C52 238, 80 205, 102 180
                 C85 190, 62 202, 35 200
                 C48 165, 88 145, 112 126
                 C95 132, 72 138, 45 130
                 C65 105, 105 95, 125 82
                 C110 85, 90 82, 70 70
                 C95 45, 120 30, 140 25 Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M152 105 C158 100, 162 106, 160 115 C156 122, 150 118, 152 105 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M128 105 C122 100, 118 106, 120 115 C124 122, 130 118, 128 105 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M155 152 C164 146, 170 155, 166 168 C160 178, 152 170, 155 152 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M125 152 C116 146, 110 155, 114 168 C120 178, 128 170, 125 152 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 75 C165 78, 190 75, 210 70" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 75 C115 78, 90 75, 70 70" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 120 C175 125, 205 125, 235 130" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 120 C105 125, 75 125, 45 130" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 175 C180 180, 215 188, 245 200" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 175 C100 180, 65 188, 35 200" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
      )}

      {/* 4. Bottom-Right: Soft Peony Foliage Sprig */}
      {(variant === 'all' || variant === 'corners' || variant === 'bottom-right' || variant === 'right') && (
        <div className="absolute -bottom-8 -right-6 sm:bottom-0 sm:right-2 w-52 h-52 sm:w-64 sm:h-64 text-salon-rose-dark opacity-[0.18] rotate-[-16deg]">
          <svg viewBox="0 0 280 280" fill="none" className="w-full h-full">
            <path d="M250 250 C180 170, 120 110, 30 50" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M205 205 C185 180, 170 168, 150 162" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M150 162
                 C128 138, 105 136, 85 142
                 C82 165, 102 185, 125 192
                 C135 190, 145 178, 150 162 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M210 215 C218 190, 230 175, 245 165" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M245 165
                 C262 142, 280 140, 292 148
                 C290 170, 272 188, 252 192
                 C248 182, 246 172, 245 165 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M152 145 C132 122, 120 112, 102 105" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M102 105
                 C80 84, 60 85, 45 92
                 C46 112, 65 128, 86 132
                 C94 126, 100 116, 102 105 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M30 50 C18 36, 10 24, 12 18 C20 18, 28 28, 30 50 Z" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </div>
      )}
    </div>
  );
}
