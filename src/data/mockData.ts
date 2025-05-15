export const exampleData = Array.from({ length: 100 }, (_, i) => ({
    name: `Example ${i + 1}`,
    album: { images: [] },
    artists: [{ name: 'Sample Source' }]
  }));