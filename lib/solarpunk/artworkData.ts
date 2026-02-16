// Solarpunk artwork from Storyseed Library (https://storyseedlibrary.org)
// All artwork is licensed under Creative Commons - please respect the license terms
// For more information: https://storyseedlibrary.org/which-art-can-i-use

export interface SolarpunkArtwork {
  id: string
  filename: string
  title: string
  artist: string
  artistUrl: string
  license: string
  licenseUrl: string
  orientation: 'horizontal' | 'vertical' | 'square'
  tags: string[]
}

export const solarpunkArtworks: SolarpunkArtwork[] = [
  {
    id: 'cargo-airship',
    filename: 'cargo-airship.jpg',
    title: 'Cargo Airship Docked at a Mooring Mast Made from Recycled Wind Turbine Tower',
    artist: 'Jacob Coffin',
    artistUrl: 'https://storyseedlibrary.org/authors/jacob-coffin/',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    orientation: 'vertical',
    tags: ['airship', 'wind turbine', 'transport', 'forest']
  },
  {
    id: 'railbus',
    filename: 'railbus.jpg',
    title: 'Railbus',
    artist: 'Jacob Coffin',
    artistUrl: 'https://storyseedlibrary.org/authors/jacob-coffin/',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    orientation: 'horizontal',
    tags: ['tram', 'train', 'transport', 'water']
  },
  {
    id: 'lifeboat-library',
    filename: 'lifeboat-library.jpg',
    title: 'Lifeboat Library',
    artist: 'Scandinavian101',
    artistUrl: 'https://storyseedlibrary.org/authors/scandinavian101/',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    orientation: 'horizontal',
    tags: ['ship', 'library', 'people']
  },
  {
    id: 'container-ship',
    filename: 'container-ship.jpg',
    title: 'Container Ship',
    artist: 'Scandinavian101',
    artistUrl: 'https://storyseedlibrary.org/authors/scandinavian101/',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    orientation: 'horizontal',
    tags: ['ship', 'sea', 'water', 'transport', 'people']
  },
  {
    id: 'rehearsal-at-portal',
    filename: 'rehearsal-at-portal.jpg',
    title: 'Rehearsal at Portal',
    artist: 'The Lemonaut',
    artistUrl: 'https://storyseedlibrary.org/authors/the-lemonaut/',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    orientation: 'horizontal',
    tags: ['people', 'dancing', 'africa', 'ukraine']
  },
  {
    id: 'communal-rock-painting',
    filename: 'communal-rock-painting.jpg',
    title: 'Communal Rock Painting',
    artist: 'Oh Shoot I Arted',
    artistUrl: 'https://storyseedlibrary.org/authors/oh-shoot-i-arted/',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    orientation: 'vertical',
    tags: ['people']
  },
  {
    id: 'solar-cooking-class',
    filename: 'solar-cooking-class.jpg',
    title: 'Solar Cooking Class',
    artist: 'Lindsay Brown',
    artistUrl: 'https://storyseedlibrary.org/authors/lindsay-brown/',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    orientation: 'horizontal',
    tags: ['people', 'crafts', 'solar', 'education']
  },
  {
    id: 'youth-center',
    filename: 'youth-center.jpg',
    title: 'Youth Center',
    artist: 'Taylor Seamount',
    artistUrl: 'https://storyseedlibrary.org/authors/taylor-seamount/',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    orientation: 'vertical',
    tags: ['people', 'farming', 'cooperation', 'solar']
  },
  {
    id: 'green-street-nurnberg',
    filename: 'green-street-nurnberg.jpg',
    title: 'Green street in Nürnberg (Germany)',
    artist: 'Dustin Jacobus',
    artistUrl: 'https://storyseedlibrary.org/authors/dustin-jacobus/',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    orientation: 'horizontal',
    tags: ['city', 'people', 'transport']
  },
  {
    id: 'restorative-justice',
    filename: 'restorative-justice.jpg',
    title: 'Restorative Justice',
    artist: 'Joan de Art (Becca Bowlin)',
    artistUrl: 'https://storyseedlibrary.org/authors/joan-de-art/',
    license: 'CC BY-NC 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
    orientation: 'vertical',
    tags: ['people', 'city']
  },
  {
    id: 'solarpunk-cityscape',
    filename: 'solarpunk-cityscape.jpg',
    title: 'Solarpunk Cityscape',
    artist: 'Daniele Turturici',
    artistUrl: 'https://storyseedlibrary.org/authors/daniele-turturici/',
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    orientation: 'vertical',
    tags: ['city', 'people', 'animals', 'trees', 'robots', 'fantastical']
  },
  {
    id: 'back-home',
    filename: 'back-home.jpg',
    title: 'Back Home',
    artist: 'Daniele Turturici',
    artistUrl: 'https://storyseedlibrary.org/authors/daniele-turturici/',
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    orientation: 'vertical',
    tags: ['city', 'people', 'animals', 'trees', 'solar', 'fantastical']
  },
  {
    id: 'morning-sun',
    filename: 'morning-sun.jpg',
    title: 'Morning Sun',
    artist: 'Daniele Turturici',
    artistUrl: 'https://storyseedlibrary.org/authors/daniele-turturici/',
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    orientation: 'vertical',
    tags: ['city', 'people', 'animals', 'trees', 'solar']
  },
  {
    id: 'chilling-on-the-terrace',
    filename: 'chilling-on-the-terrace.jpg',
    title: 'Chilling on the Terrace',
    artist: 'Daniele Turturici',
    artistUrl: 'https://storyseedlibrary.org/authors/daniele-turturici/',
    license: 'CC BY-NC-ND 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    orientation: 'vertical',
    tags: ['city', 'people', 'animals', 'trees', 'solar', 'robots', 'fantastical']
  },
  {
    id: 'san-francisco-civic-center',
    filename: 'san-francisco-civic-center.jpg',
    title: "San Francisco's Civic Center",
    artist: 'Taylor Seamount',
    artistUrl: 'https://storyseedlibrary.org/authors/taylor-seamount/',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    orientation: 'horizontal',
    tags: ['city', 'people', 'trees', 'infrastructure', 'transport', 'ropeway']
  },
  {
    id: 'school-of-athens-2050',
    filename: 'school-of-athens-2050.jpg',
    title: 'The School of Athens 2050',
    artist: 'Commando Jugendstil',
    artistUrl: 'https://storyseedlibrary.org/authors/commando-jugendstil/',
    license: 'CC BY-NC-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    orientation: 'vertical',
    tags: ['people', 'symbolism', 'cooperation']
  }
]

// Helper function to get a random artwork
export function getRandomArtwork(): SolarpunkArtwork {
  return solarpunkArtworks[Math.floor(Math.random() * solarpunkArtworks.length)]
}

// Helper function to get artworks by tag
export function getArtworksByTag(tag: string): SolarpunkArtwork[] {
  return solarpunkArtworks.filter(artwork =>
    artwork.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

// Helper function to get artworks by orientation
export function getArtworksByOrientation(orientation: 'horizontal' | 'vertical' | 'square'): SolarpunkArtwork[] {
  return solarpunkArtworks.filter(artwork => artwork.orientation === orientation)
}

// Get only permissive licenses (CC BY or CC BY-SA) for commercial use
export function getPermissiveArtworks(): SolarpunkArtwork[] {
  return solarpunkArtworks.filter(artwork =>
    artwork.license.includes('CC BY') && !artwork.license.includes('NC')
  )
}
