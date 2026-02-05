# Asset Processing Strategy

## Inventory Summary

### Main Folder (~/Assets/Images/Portfolio Site Assets/Unused)
- **Total Size**: ~41MB
- **17 Images**: 44K to 6.7MB
- **10 Videos**: 246K to 3.4MB

### Large Files Folder
- **Total Size**: ~375MB
- **2 Large Images**: 16-18MB
- **7 Large Videos**: 15MB to 105MB

---

## Processing Chunks

### Chunk 1: Small Images (<1MB)
**Files (7):**
1. IMG_1028.JPG (44K)
2. C6EC4A32-F5A8-4F56-B3E6-C26D41924131.jpg (362K)
3. IMG_8432.JPEG (505K)
4. 62922905086__25EFAD62-FEB1-4751-8311-6A4F137700F8.JPEG (507K)
5. IMG_7555.JPEG (771K)
6. IMG_9585.JPEG (958K)
7. 25AA2C93-2CC8-43E4-8463-9D9678D4B04A.JPEG (1.1M)

**Strategy**: Process all together in one session. Compress, categorize by content, integrate into appropriate pages.

---

### Chunk 2: Medium Images (1-2.5MB)
**Files (7):**
1. IMG_0806.JPG (1.1M)
2. IMG_8188.JPEG (1.2M)
3. IMG_0155.JPG (1.3M)
4. IMG_8433.JPEG (1.3M)
5. IMG_7860.JPG (1.5M)
6. IMG_0063.JPG (1.6M)
7. IMG_0382.JPG (1.9M)

**Strategy**: Process all together in one session. Compress, categorize, integrate.

---

### Chunk 3: Large Images (2.5-7MB)
**Files (3):**
1. IMG_1137.JPG (2.3M)
2. IMG_0111.jpeg (3.1M)
3. DSC_0194.JPG (6.7M)

**Strategy**: Process together in one session. Heavier compression needed.

---

### Chunk 4: Small Videos (<2MB)
**Files (6):**
1. IMG_6879.MOV (246K)
2. FullSizeRender.MOV (483K)
3. IMG_8188.MOV (881K)
4. IMG_8432.MOV (1.2M)
5. IMG_8433.MOV (1.2M)
6. 25AA2C93-2CC8-43E4-8463-9D9678D4B04A.MOV (1.5M)

**Strategy**: Process together. Convert to web-optimized format (WebM/MP4), add as autoplay background/inline elements.

---

### Chunk 5: Medium Videos (2-4MB)
**Files (4):**
1. IMG_7290.MOV (1.6M)
2. IMG_9084.MP4 (1.6M)
3. IMG_3930.mov (3.2M)
4. IMG_0406.MOV (3.4M)

**Strategy**: Process together. May need clipping/trimming for size optimization.

---

### Large Files (Individual Sessions)

#### Large Images
1. **IMG_0827.JPG** (18MB) - Individual session
2. **IMG_0867.JPG** (16MB) - Individual session

#### Large Videos (Ascending size)
3. **IMG_7022.MP4** (15MB) - Individual session
4. **IMG_7095.MP4** (16MB) - Individual session
5. **IMG_0044.MOV** (20MB) - Individual session
6. **IMG_0830.MOV** (51MB) - Individual session
7. **IMG_0192.MP4** (56MB) - Individual session
8. **IMG_0100.MOV** (82MB) - Individual session
9. **IMG_9088.MP4** (105MB) - Individual session

**Strategy**: Each gets its own processing session with Task agent. Videos will need:
- Compression/optimization
- Possible clipping to reduce filesize
- Conversion to web formats
- Muted autoplay configuration

---

## Video Integration Guidelines

All videos should be:
- **Muted** by default
- **Autoplay** enabled
- **Loop** enabled (unless specified otherwise)
- **Inline** or background placement
- Optimized format: WebM (with MP4 fallback)
- Compressed to reasonable web size

### Placement Ideas:
- Hero section backgrounds
- Parallax dividers (replace static images)
- Interests/hobbies page (climbing, music, travel)
- Journey page enhancements
- Profile page personal touches

---

## Next Steps

1. Start with Chunk 1 (smallest images)
2. Work through chunks 2-5 sequentially
3. Process large files individually
4. Review and refine integration
5. Performance testing with videos

---

## Dark/Light Mode Implementation Plan

### High-Level Steps:

1. **Create Theme Color Variables**
   - Define light mode color palette
   - Define dark mode color palette
   - Ensure WCAG accessibility compliance
   - Map existing colors to theme-aware variables

2. **Implement Theme Context/Provider**
   - Create React context for theme state
   - Build theme provider component
   - Add theme switching logic
   - Wrap app with provider

3. **Add System Preference Detection**
   - Use `prefers-color-scheme` media query
   - Set initial theme based on system preference
   - Listen for system preference changes
   - Handle SSR considerations (Next.js)

4. **Create Theme Toggle UI**
   - Design toggle component (sun/moon icon)
   - Add to navigation
   - Consider accessibility (keyboard, screen readers)
   - Add smooth transition animations

5. **Update Components for Theme Support**
   - Update SCSS variables to use CSS custom properties
   - Audit all components for hardcoded colors
   - Test each page in both modes
   - Ensure images/backgrounds work in both themes

6. **Persist User Preference**
   - Save theme choice to localStorage
   - Load on app initialization
   - Handle hydration (Next.js specific)
   - Prevent flash of wrong theme (FOUT)

### Technical Considerations:
- Use CSS custom properties for runtime theme switching
- Implement dark mode image variants where needed
- Consider reduced motion preferences
- Test contrast ratios in both modes
- Optimize transition performance
