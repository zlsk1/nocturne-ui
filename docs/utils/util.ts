export const subExtention = (path: string) => {
  return path.slice(0, Math.max(0, path.lastIndexOf('.')))
}
