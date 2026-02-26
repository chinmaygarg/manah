"""
═══════════════════════════════════════════════════════════════
MANAH GROUP — Website Asset Generation Prompts
═══════════════════════════════════════════════════════════════

All image and video prompts for the Manah Group website.
Brand palette: Deep Navy (#0A1628), Gold (#C8A96E), Dark (#1A1A2E)
Style: Premium, cinematic, professional EPC enterprise
═══════════════════════════════════════════════════════════════
"""

# ─────────────────────────────────────────────
# BRAND STYLE DIRECTIVES (prepended to all prompts)
# ─────────────────────────────────────────────

BRAND_STYLE = (
    "Ultra-premium corporate photography style. Deep navy blue (#0A1628) and warm gold (#C8A96E) "
    "color accents. Cinematic lighting with dramatic shadows. Shot on medium format camera. "
    "Professional grade, editorial quality. No text, no logos, no watermarks. "
    "Clean composition with clear focal point. "
)

AERIAL_STYLE = (
    "Aerial drone photography, golden hour lighting, cinematic grade. "
    "Deep navy blue and warm gold color tones. Ultra high resolution, editorial quality. "
    "No text, no logos, no watermarks. "
)

PORTRAIT_STYLE = (
    "Professional corporate portrait photography. Studio lighting with subtle rim light. "
    "Deep navy background with warm gold accent lighting. Shot on 85mm f/1.4 lens. "
    "Sharp focus on subject, creamy bokeh background. Editorial quality. "
    "No text, no watermarks. "
)

# ─────────────────────────────────────────────
# IMAGE PROMPTS
# ─────────────────────────────────────────────

IMAGE_PROMPTS = {

    # ═══ HERO SECTION IMAGES ═══
    "hero": [
        {
            "id": "hero_main_01",
            "filename": "hero/hero_main_infrastructure.png",
            "prompt": (
                AERIAL_STYLE +
                "Breathtaking aerial view of a massive modern power transmission infrastructure project "
                "stretching across an Indian landscape at golden hour. High voltage transmission towers "
                "with power lines extending to the horizon. Lush green terrain below. Dramatic sky with "
                "golden clouds. Scale and grandeur of mega engineering. Conveying power, progress, and "
                "nation-building."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Homepage hero background - primary"
        },
        {
            "id": "hero_main_02",
            "filename": "hero/hero_construction_site.png",
            "prompt": (
                AERIAL_STYLE +
                "Sweeping aerial view of a large-scale modern construction site in India. "
                "Multiple cranes, steel structures being erected, concrete foundations. "
                "Workers in safety gear coordinating operations. Dust particles catching golden sunlight. "
                "Modern Indian city skyline in the background. Scale of a mega infrastructure project. "
                "Dawn light creating long dramatic shadows."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Homepage hero background - alternate slide"
        },
        {
            "id": "hero_main_03",
            "filename": "hero/hero_renewable_energy.png",
            "prompt": (
                AERIAL_STYLE +
                "Stunning aerial view of a massive solar farm and wind turbine installation in "
                "the Indian desert at sunset. Rows of gleaming solar panels reflecting golden light. "
                "Modern wind turbines in the background against a dramatic orange and navy sky. "
                "Clean energy at industrial scale. Conveying sustainability and future-forward vision."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Homepage hero background - green energy slide"
        },
        {
            "id": "hero_main_04",
            "filename": "hero/hero_aviation_mro.png",
            "prompt": (
                AERIAL_STYLE +
                "Modern aircraft maintenance hangar from elevated perspective. Commercial aircraft "
                "with panels open being serviced by technicians in professional uniforms. "
                "Clean, well-lit industrial space with advanced tooling stations. "
                "Precision engineering environment. Blue-tinted industrial lighting with warm accent spots. "
                "Conveying technical excellence and aviation expertise."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Homepage hero background - aerospace slide"
        },
    ],

    # ═══ BUSINESS DIVISION IMAGES ═══
    "divisions": [
        {
            "id": "div_dynamics_01",
            "filename": "divisions/manah_dynamics_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Dramatic wide-angle view of a large-scale EPC project under construction. "
                "Steel structures, tower cranes, and scaffolding against a dramatic twilight sky. "
                "Construction workers silhouetted against golden backlighting. Power transmission "
                "towers being erected. Industrial scale engineering project in India. "
                "Conveys strength, precision, and large-scale capability."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Manah Dynamics (Projects & Infrastructure) division hero"
        },
        {
            "id": "div_dynamics_02",
            "filename": "divisions/manah_dynamics_projects.png",
            "prompt": (
                BRAND_STYLE +
                "Engineers and project managers reviewing blueprints at a modern infrastructure "
                "construction site. Hard hats, safety vests, tablets showing 3D BIM models. "
                "Partially completed bridge or highway overpass in the background. "
                "Professional collaboration, diverse Indian team. Warm golden hour light."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Manah Dynamics - project management showcase"
        },
        {
            "id": "div_aerospace_01",
            "filename": "divisions/manah_aerospace_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Interior of a modern aircraft MRO (Maintenance, Repair, Overhaul) facility. "
                "Wide-body commercial aircraft in a vast, clean hangar with advanced diagnostic "
                "equipment. Technicians performing precision maintenance. Cool blue industrial "
                "lighting with warm spot highlights on the aircraft fuselage. "
                "High-tech, precision environment conveying aerospace expertise."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Manah Aerospace (Aviation & MRO) division hero"
        },
        {
            "id": "div_aerospace_02",
            "filename": "divisions/manah_aerospace_detail.png",
            "prompt": (
                BRAND_STYLE +
                "Close-up of aircraft turbine engine being inspected with advanced diagnostic tools. "
                "Technician's gloved hands with precision instruments. Beautiful mechanical detail "
                "of turbine blades. Shallow depth of field. Cool metallic tones with warm "
                "accent lighting. Conveying precision engineering and technical mastery."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Manah Aerospace - detail/capability shot"
        },
        {
            "id": "div_green_energy_01",
            "filename": "divisions/green_energy_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Futuristic green hydrogen production facility at dawn. Electrolyzers, storage "
                "tanks, and pipeline infrastructure gleaming in golden morning light. Clean, "
                "modern industrial design. Green vegetation and blue sky creating a contrast "
                "with the metallic infrastructure. Represents the future of clean energy. "
                "Cinematic wide-angle perspective conveying innovation and sustainability."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Green Energy (Hydrogen) division hero"
        },
        {
            "id": "div_green_energy_02",
            "filename": "divisions/green_energy_hydrogen.png",
            "prompt": (
                BRAND_STYLE +
                "Artistic close-up of green hydrogen molecules visualization blending with "
                "real industrial equipment. Abstract green and blue light particles flowing "
                "through modern piping infrastructure. Futuristic clean energy concept. "
                "Teal and emerald green tones with gold accents. Science meets industry."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Green Energy - hydrogen concept image"
        },
        {
            "id": "div_tech_01",
            "filename": "divisions/tech_manufacturing_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Modern electronics manufacturing facility with automated SMT (Surface Mount "
                "Technology) production line. Circuit boards moving through pick-and-place machines. "
                "Clean room environment with blue-tinted lighting. Robotic arms and conveyor systems. "
                "High-tech precision manufacturing. Conveying technological advancement and "
                "manufacturing excellence."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Technology & Manufacturing (EMS) division hero"
        },
        {
            "id": "div_tech_02",
            "filename": "divisions/tech_manufacturing_pcb.png",
            "prompt": (
                BRAND_STYLE +
                "Macro photography of a modern printed circuit board with surface-mounted "
                "components. Shallow depth of field with beautiful bokeh. Blue and gold "
                "tones reflecting off solder points and copper traces. Electronic precision "
                "at micro scale. Clean, technical, high-resolution detail shot."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Technology & Manufacturing - detail shot"
        },
    ],

    # ═══ SECTOR IMAGES ═══
    "sectors": [
        {
            "id": "sector_power_transmission",
            "filename": "sectors/power_transmission.png",
            "prompt": (
                BRAND_STYLE +
                "Row of high-voltage power transmission towers stretching across Indian countryside "
                "at sunset. Silhouetted against dramatic orange and navy sky. Power lines creating "
                "leading lines toward the horizon. Vast scale and engineering achievement. "
                "Warm golden light reflecting off metal tower structures."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Power Transmission sector page hero"
        },
        {
            "id": "sector_renewable",
            "filename": "sectors/renewable_energy.png",
            "prompt": (
                BRAND_STYLE +
                "Expansive solar farm with modern bifacial solar panels in perfect rows, "
                "large wind turbines in the background against a clear blue sky with scattered clouds. "
                "Indian semi-arid landscape. Clean energy at massive scale. "
                "Bright, optimistic lighting conveying hope and progress."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Renewable Energy sector page hero"
        },
        {
            "id": "sector_infrastructure",
            "filename": "sectors/infrastructure.png",
            "prompt": (
                BRAND_STYLE +
                "Dramatic view of a modern cable-stayed bridge at twilight with city lights "
                "reflecting in the water below. Indian urban infrastructure. "
                "Cars with light trails crossing the bridge. Deep navy sky with golden "
                "bridge illumination. Monumental engineering achievement."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Infrastructure sector page hero"
        },
        {
            "id": "sector_defence",
            "filename": "sectors/defence_electronics.png",
            "prompt": (
                BRAND_STYLE +
                "Modern defence electronics laboratory with advanced radar and communication "
                "equipment. Screens displaying complex data visualizations. "
                "Precision instruments and circuit boards on workbenches. "
                "Dark environment with blue and amber monitor glow. "
                "High-security, cutting-edge technology environment."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Defence Electronics sector page hero"
        },
        {
            "id": "sector_aviation",
            "filename": "sectors/aviation.png",
            "prompt": (
                BRAND_STYLE +
                "Modern commercial airport terminal under construction with aircraft visible "
                "through massive glass curtain walls. Steel and glass architecture. "
                "Construction cranes and workers visible. Golden hour light streaming through "
                "the terminal structure. Blending aviation and construction themes."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Aviation sector page hero"
        },
        {
            "id": "sector_green_hydrogen",
            "filename": "sectors/green_hydrogen.png",
            "prompt": (
                BRAND_STYLE +
                "Futuristic green hydrogen storage facility with large spherical tanks "
                "connected by gleaming pipelines. Wind turbines and solar panels visible "
                "in the background powering the electrolysis. Clean, bright environment. "
                "Green and teal accent colors. Future of energy concept."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Green Hydrogen sector page hero"
        },
        {
            "id": "sector_manufacturing",
            "filename": "sectors/manufacturing.png",
            "prompt": (
                BRAND_STYLE +
                "Automated manufacturing facility interior with robotic arms on assembly line. "
                "Sparks from precision welding. Modern Indian factory environment. "
                "Clean, organized industrial space. Blue safety lighting with orange welding glow. "
                "Industry 4.0 smart manufacturing concept."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Manufacturing sector page hero"
        },
    ],

    # ═══ ABOUT PAGE IMAGES ═══
    "about": [
        {
            "id": "about_hero",
            "filename": "about/about_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Modern corporate office building exterior in Hyderabad, India at blue hour. "
                "Sleek glass and steel architecture with warm interior lighting visible. "
                "Professional landscaping. Deep navy twilight sky. Premium corporate "
                "headquarters aesthetic. Architectural photography style."
            ),
            "aspect_ratio": "16:9",
            "purpose": "About Us page hero image"
        },
        {
            "id": "about_team",
            "filename": "about/team_collaboration.png",
            "prompt": (
                BRAND_STYLE +
                "Diverse team of Indian professionals in a modern glass-walled conference room. "
                "Animated discussion with laptops, tablets, and architectural drawings on the table. "
                "Mixed gender team in business attire. Natural daylight from floor-to-ceiling windows. "
                "City skyline visible. Warm, collaborative energy. Professional but approachable."
            ),
            "aspect_ratio": "16:9",
            "purpose": "About Us - team/culture section"
        },
        {
            "id": "about_values",
            "filename": "about/values_mindful.png",
            "prompt": (
                BRAND_STYLE +
                "Abstract artistic image representing 'mindful enterprising'. "
                "A golden compass on a deep navy surface, surrounded by subtle geometric patterns "
                "reminiscent of circuit boards and architectural blueprints. Clean, minimal, symbolic. "
                "Navy blue and warm gold color palette. Represents vision, direction, and purpose."
            ),
            "aspect_ratio": "1:1",
            "purpose": "About Us - values/philosophy visual"
        },
        {
            "id": "about_timeline_bg",
            "filename": "about/timeline_background.png",
            "prompt": (
                "Minimal abstract background pattern. Subtle geometric grid lines in very light "
                "gold (#C8A96E at 10% opacity) on a near-white (#FAFAF8) background. "
                "Faint blueprint-style technical drawing elements. Clean, modern, barely visible. "
                "Perfect for use as a texture background behind content. No focal point, no objects."
            ),
            "aspect_ratio": "16:9",
            "purpose": "About Us - timeline section background texture"
        },
    ],

    # ═══ SUSTAINABILITY IMAGES ═══
    "sustainability": [
        {
            "id": "sustain_hero",
            "filename": "sustainability/sustainability_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Dramatic landscape where modern renewable energy infrastructure harmoniously "
                "blends with pristine natural environment. Solar panels nestled in green hills, "
                "wind turbines on a ridge, a river flowing through the valley. Golden hour light. "
                "Balance between human progress and nature. Hopeful, majestic, inspiring."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Sustainability page hero"
        },
        {
            "id": "sustain_community",
            "filename": "sustainability/community_impact.png",
            "prompt": (
                BRAND_STYLE +
                "Indian rural community benefiting from infrastructure development. "
                "Children studying under reliable electric light. Clean water facility "
                "with modern pipeline. Smiling faces, vibrant colors. Professional documentary "
                "photography style. Warm, human, genuine. Social impact of infrastructure."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Sustainability - social impact section"
        },
        {
            "id": "sustain_environment",
            "filename": "sustainability/environment.png",
            "prompt": (
                BRAND_STYLE +
                "Green construction practices: modern building site with sustainable materials, "
                "rainwater harvesting system, tree-lined perimeter, electric construction vehicles. "
                "ECO-friendly industrial site. Green certification standards. "
                "Bright, clean, optimistic mood."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Sustainability - environmental section"
        },
    ],

    # ═══ CAREERS PAGE IMAGES ═══
    "careers": [
        {
            "id": "careers_hero",
            "filename": "careers/careers_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Young Indian professionals at a modern corporate campus. Walking through "
                "a sunlit glass corridor with green courtyard visible. Confident, dynamic, "
                "purposeful stride. Business casual attire. Modern architecture with "
                "wooden and glass elements. Warm, inviting, aspirational."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Careers page hero"
        },
        {
            "id": "careers_culture",
            "filename": "careers/team_culture.png",
            "prompt": (
                BRAND_STYLE +
                "Vibrant team celebration in a modern Indian office. Colleagues gathered around "
                "a project milestone board, clapping and smiling. Casual Friday attire. "
                "Open-plan office with exposed ceiling, indoor plants, and whiteboards. "
                "Genuine joy and camaraderie. Natural candid photography style."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Careers - culture/life at Manah section"
        },
        {
            "id": "careers_engineering",
            "filename": "careers/engineering_team.png",
            "prompt": (
                BRAND_STYLE +
                "Team of engineers at a project site reviewing 3D holographic BIM model "
                "on a large tablet. Hard hats with company colors. Partially built structure "
                "in background. Focused, professional, collaborative. Mix of senior and "
                "junior engineers mentoring. Golden hour site lighting."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Careers - engineering roles section"
        },
        {
            "id": "careers_growth",
            "filename": "careers/professional_growth.png",
            "prompt": (
                BRAND_STYLE +
                "Modern corporate training room with Indian professionals attending a "
                "technical workshop. Large screen showing engineering diagrams. "
                "Participants taking notes, asking questions. Professional development "
                "in action. Bright, well-designed learning space."
            ),
            "aspect_ratio": "4:3",
            "purpose": "Careers - growth & development section"
        },
    ],

    # ═══ PARTNERS PAGE IMAGES ═══
    "partners": [
        {
            "id": "partners_hero",
            "filename": "partners/partners_hero.png",
            "prompt": (
                BRAND_STYLE +
                "Two business executives shaking hands at a modern conference table with "
                "a large project model visible. Indian and international business leaders. "
                "Glass-walled meeting room with city view. Professional, warm handshake. "
                "Symbolizing partnership, trust, and collaboration. Formal business attire."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Partners page hero"
        },
    ],

    # ═══ UI ELEMENTS & TEXTURES ═══
    "ui-elements": [
        {
            "id": "ui_pattern_navy",
            "filename": "ui-elements/pattern_navy_geometric.png",
            "prompt": (
                "Seamless tileable geometric pattern. Thin gold (#C8A96E) lines forming "
                "hexagonal grid on deep navy (#0A1628) background. Very subtle, minimal. "
                "Engineering blueprint meets luxury. Perfect for web background texture. "
                "Clean vector-style precision. No gradients, flat design."
            ),
            "aspect_ratio": "1:1",
            "purpose": "Dark section background pattern"
        },
        {
            "id": "ui_pattern_light",
            "filename": "ui-elements/pattern_light_geometric.png",
            "prompt": (
                "Seamless tileable geometric pattern. Very thin light gray (#E5E5E0) lines "
                "forming subtle triangular tessellation on white (#FAFAF8) background. "
                "Barely visible technical grid. Architectural precision. "
                "Perfect for web background texture. Minimal, clean."
            ),
            "aspect_ratio": "1:1",
            "purpose": "Light section background pattern"
        },
        {
            "id": "ui_globe_bg",
            "filename": "ui-elements/globe_background.png",
            "prompt": (
                "Abstract dark background with subtle illuminated globe wireframe. "
                "Deep navy (#0A1628) fading to near-black. Faint latitude and longitude "
                "grid lines glowing in teal blue. Subtle star field. "
                "India region slightly brighter. Futuristic, minimal, elegant. "
                "Perfect backdrop for 3D globe overlay."
            ),
            "aspect_ratio": "16:9",
            "purpose": "Global presence section background"
        },
        {
            "id": "ui_cta_bg",
            "filename": "ui-elements/cta_background.png",
            "prompt": (
                "Abstract blurred background. Deep navy blue (#0A1628) with diagonal "
                "streaks of warm gold (#C8A96E) light. Cinematic lens flare. "
                "Smooth gradient with bokeh circles. Premium, luxurious. "
                "Perfect for overlay with white text CTA."
            ),
            "aspect_ratio": "16:9",
            "purpose": "CTA banner background"
        },
    ],
}


# ─────────────────────────────────────────────
# VIDEO PROMPTS
# ─────────────────────────────────────────────

VIDEO_PROMPTS = {

    "hero": [
        {
            "id": "video_hero_main",
            "filename": "hero/hero_main_loop.mp4",
            "prompt": (
                "Cinematic aerial drone shot slowly flying over a massive modern infrastructure "
                "construction project in India at golden hour. Camera glides smoothly forward over "
                "power transmission towers, steel structures, and construction cranes. "
                "Workers visible below coordinating operations. Dramatic clouds with golden sunlight "
                "streaming through. Dust particles catching light. Slow, majestic camera movement. "
                "Deep navy shadows and warm golden highlights. 4K cinematic quality. "
                "Shot on Arri Alexa. Smooth, loopable. 8 seconds."
            ),
            "duration": 8,
            "purpose": "Homepage hero background video - primary loop"
        },
        {
            "id": "video_hero_energy",
            "filename": "hero/hero_renewable_loop.mp4",
            "prompt": (
                "Cinematic aerial time-lapse of a vast solar farm transitioning from dawn to "
                "golden hour. Camera slowly rises revealing the enormous scale of the installation. "
                "Wind turbines spinning gently in the background. Cloud shadows moving across the "
                "solar panels. Warm golden light gradually illuminating the panels. "
                "Serene, powerful, hopeful mood. Deep navy to warm gold color transition. "
                "4K cinematic quality. Smooth, loopable. 8 seconds."
            ),
            "duration": 8,
            "purpose": "Homepage hero background video - renewable energy loop"
        },
        {
            "id": "video_hero_aerospace",
            "filename": "hero/hero_aerospace_loop.mp4",
            "prompt": (
                "Cinematic slow dolly shot inside a modern aircraft MRO hangar. Camera moves "
                "along the fuselage of a wide-body commercial aircraft being serviced. "
                "Technicians working on open engine cowling with precision tools. Cool blue "
                "industrial lighting with warm spot highlights on the aircraft skin. "
                "Reflections on the polished hangar floor. Precision, technology, expertise. "
                "4K cinematic quality. Smooth, loopable. 8 seconds."
            ),
            "duration": 8,
            "purpose": "Homepage hero background video - aerospace loop"
        },
    ],

    "about": [
        {
            "id": "video_about_story",
            "filename": "about/company_story.mp4",
            "prompt": (
                "Cinematic montage sequence: starts with sunrise over Indian landscape, "
                "transitions to time-lapse of a building being constructed from foundation to "
                "completion, then to a team of engineers reviewing plans together, ending with "
                "a sweeping aerial shot of completed infrastructure against a dramatic sky. "
                "Deep navy and warm gold color grading throughout. Smooth cross-dissolve "
                "transitions. Emotional, inspiring, aspirational. 4K cinematic. 12 seconds."
            ),
            "duration": 8,
            "purpose": "About page - company story background"
        },
    ],

    "divisions": [
        {
            "id": "video_div_dynamics",
            "filename": "divisions/dynamics_reel.mp4",
            "prompt": (
                "Cinematic drone shot circling a large-scale power transmission project. "
                "High-voltage towers being assembled with cranes. Camera orbits slowly revealing "
                "the scale of the project against the Indian countryside. Workers in safety gear "
                "visible on the towers. Golden hour lighting creating long shadows. "
                "Powerful, impressive engineering scale. 4K cinematic. 8 seconds."
            ),
            "duration": 8,
            "purpose": "Manah Dynamics division page background"
        },
        {
            "id": "video_div_green",
            "filename": "divisions/green_energy_reel.mp4",
            "prompt": (
                "Cinematic slow-motion shot of hydrogen being produced in a modern electrolysis "
                "facility. Camera tracks along gleaming pipelines and storage tanks. "
                "Subtle steam or vapor visible. Green and teal lighting accents. "
                "Wind turbines visible through facility windows. Clean, futuristic, hopeful. "
                "4K cinematic quality. 8 seconds."
            ),
            "duration": 8,
            "purpose": "Green Energy division page background"
        },
    ],

    "careers": [
        {
            "id": "video_careers_culture",
            "filename": "careers/culture_reel.mp4",
            "prompt": (
                "Cinematic lifestyle montage of modern Indian corporate culture. Young professionals "
                "walking into a modern glass office building, collaborative meetings with diverse teams, "
                "engineers at project sites with hard hats, team lunch in a bright cafeteria, "
                "after-work sports activity. Warm, vibrant color grading with navy and gold tones. "
                "Natural, candid moments. Aspirational employer brand. 4K cinematic. 12 seconds."
            ),
            "duration": 8,
            "purpose": "Careers page - culture video background"
        },
    ],
}


def get_all_image_prompts():
    """Return a flat list of all image prompt dictionaries."""
    all_prompts = []
    for category, prompts in IMAGE_PROMPTS.items():
        for p in prompts:
            p["category"] = category
            all_prompts.append(p)
    return all_prompts


def get_all_video_prompts():
    """Return a flat list of all video prompt dictionaries."""
    all_prompts = []
    for category, prompts in VIDEO_PROMPTS.items():
        for p in prompts:
            p["category"] = category
            all_prompts.append(p)
    return all_prompts


def get_summary():
    """Print a summary of all assets to be generated."""
    img_count = sum(len(v) for v in IMAGE_PROMPTS.values())
    vid_count = sum(len(v) for v in VIDEO_PROMPTS.values())
    print(f"\n{'='*60}")
    print(f"  MANAH GROUP — Asset Generation Summary")
    print(f"{'='*60}")
    print(f"\n  Total Images: {img_count}")
    for cat, prompts in IMAGE_PROMPTS.items():
        print(f"    {cat:20s} : {len(prompts)} images")
    print(f"\n  Total Videos: {vid_count}")
    for cat, prompts in VIDEO_PROMPTS.items():
        print(f"    {cat:20s} : {len(prompts)} videos")
    print(f"\n  Grand Total: {img_count + vid_count} assets")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    get_summary()
