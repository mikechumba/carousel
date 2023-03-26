const dataUrl = "https://www.reddit.com/r/aww/top/.json?t=all";

export const fetchData = async () => {
  const res = await fetch(dataUrl);
  const data = await res.json();

  const images = data.data.children.map(({ data: child }) => ({
    alt: child.title,
    src: child.url_overridden_by_dest
  })).filter(img => img.src.endsWith('.jpg'));

  return images;
};
