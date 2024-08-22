export function GetWishPostImage(wishlistItem) {
  const itemsJson =
    wishlistItem?.mediaGalleryUrl?.length > 4
      ? JSON.parse(wishlistItem?.mediaGalleryUrl)
      : undefined;
  return wishlistItem?.postType === 'POST'
    ? itemsJson?.length > 0
      ? itemsJson[0]?.thumbnailUrl ?? itemsJson[0]?.url
      : undefined
    : wishlistItem?.thumbnail;
}
