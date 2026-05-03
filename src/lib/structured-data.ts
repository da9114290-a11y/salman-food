/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const generateRestaurantSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Salman Food",
    "description": "Karachi's favourite fast food restaurant. Crispy fried chicken, loaded burgers, incredible deals. Order online or visit us. Delivery in 20 minutes.",
    "url": "https://salmanfood.pk",
    "telephone": "+92-21-34567890",
    "image": "https://salmanfood.pk/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop 4, Block 6, Gulshan-e-Iqbal",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75300",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.9180,
      "longitude": 67.0971
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "00:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "01:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "servesCuisine": ["Pakistani", "Fast Food", "Burgers", "Fried Chicken"],
    "priceRange": "Rs. 150 - Rs. 2500",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "5420"
    },
    "menu": "https://salmanfood.pk#menu",
    "acceptsReservations": "false"
  };
};

export const generateMenuItemSchema = (item: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "name": item.name,
    "description": item.description,
    "image": item.image,
    "offers": {
      "@type": "Offer",
      "price": item.price,
      "priceCurrency": "PKR",
      "availability": "https://schema.org/InStock"
    }
  };
};
