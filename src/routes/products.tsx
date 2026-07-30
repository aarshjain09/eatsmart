import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

const products = [
 {
    id: 1,
    image: "https://m.media-amazon.com/images/I/71620dZ5esL._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B0hEK59SB",
	productName: "Pumpkin Seeds",
  },

{
    id: 2,
    image: "https://m.media-amazon.com/images/I/716WM50lCNL._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B0dWmbqD1",
	productName: "Sunflower Seeds",
  },


{
    id: 3,
    image: "https://m.media-amazon.com/images/I/51yl3YN07kL._SL1080_.jpg",
    amazonLink:  "https://link.amazon/B0bTWveHW",
	productName: "Quinoa",
  },



{
    id: 4,
    image: "https://m.media-amazon.com/images/I/71aFLaxhsbL._SL1500_.jpg",
    amazonLink: "https://link.amazon/B01ToIHMb" ,
	productName: "Watermelon Seeds",
  },


{
    id: 5,
    image: "https://m.media-amazon.com/images/I/61ncmjQk0cL._SX679_.jpg",
    amazonLink: "https://link.amazon/B0bBToXO2",
	productName: "Flex Seeds",
  },



{
    id: 6,
    image: "https://m.media-amazon.com/images/I/61mDvrFuiQL.jpg",
    amazonLink:  "https://link.amazon/B02296OVj",
	productName: "Rolled Oats",
  },



{
    id: 7,
    image: "https://m.media-amazon.com/images/I/711JJsEMUPL._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B02A9BpLY",
	productName: "7 in 1 Mix Seeds",
  },
{
    id: 8,
    image: "https://m.media-amazon.com/images/I/61dMAFq28zL.jpg",
    amazonLink: "https://link.amazon/B05lhHNhP",
	productName: "Seeds Combo",
  },
{
    id: 9,
    image: "https://m.media-amazon.com/images/I/61hKwTsa-GL._SL1080_.jpg",
    amazonLink: "https://link.amazon/B0bi5T2JY" ,
	productName: "Chia Seeds",
  },
{
    id: 11,
    image: "https://m.media-amazon.com/images/I/71TDNgqLfkL._SL1500_.jpg",
    amazonLink: "https://link.amazon/B05UilOnH" ,
	productName: "Rolled Oats",
  },

{
    id: 13,
    image: "https://m.media-amazon.com/images/I/71mYr24r8cL._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B028keKpn",
	productName: "Halim Seeds",
  },
{
    id: 14,
    image: "https://m.media-amazon.com/images/I/71WWrZDHS-L._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B04dBg5F5",
	productName: "Kodo Millet",
  },
{
    id: 15,
    image: "https://m.media-amazon.com/images/I/71MI2MQrHzL._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B0gwDMV3c",
	productName: "Jowar",
  },
{
    id: 16,
    image: "https://m.media-amazon.com/images/I/71Y5PGUmk8L._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B07oUAiWu",
	productName: "Ragi/Nachani",
  },
{
    id: 17,
    image: "https://m.media-amazon.com/images/I/71-FiOAzyUL._SL1500_.jpg",
    amazonLink:  "https://link.amazon/B02k4YKLe",
	productName: "Bajara",
  },
];

function ProductsPage() {
  return (
    <section className="bg-background py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-forest-deep">
            Recommended Products
          </h1>

          <p className="mt-4 text-muted-foreground">
            Shop Dr. Pinal Jain's recommended health and nutrition products.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              amazonLink={product.amazonLink}
				productName ={product.productName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
