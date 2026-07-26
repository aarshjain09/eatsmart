import { createFileRoute } from "@tanstack/react-router";
import ProductCard from "@/components/ProductCard";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

const products = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/61mDvrFuiQL._SY300_SX300_QL70_FMwebp_.jpg",
    amazonLink: "https://www.amazon.in/True-Elements-Rolled-Gluten-Wholegrain/dp/B07SBMKVRV?crid=1MCR9PVL75VA1&dib=eyJ2IjoiMSJ9.HFMR1eIREUJ9ry2HSJ-YysAU9EnmxY9ATWcVwSzi0zwv6n0hX4n4057U-QqH9bs2yLLXTQvTpwXmpvte-R-KSXCOFWcMumdra4dP6iv8zv_AbiSCTp0aL6Oq2bg1aDMvWXWuzXsv6i1XyRQ3PtRLIxI0yfm_YGPnrQ8skp9M_dkOqscnqARSDbZaImPpxHoXKKO7rAwpPYy0ZC41r2HzrjnE_d_cr1PHiPYWQmraxANOtlT_esLVN26B3qYfIUZ3cO5OxoEjNgusvIfe6ZbwsJNSRRDRCWSA-BzPWUxZdFs.F4xmoJEuyZRlWnG02dAwW5jfCPmhMZeavmqmdSdA9dU&dib_tag=se&keywords=true%2Belements&nsdOptOutParam=true&qid=1784108411&sbo=m6DjfpMzMLDmL8pSMKX8hw%3D%3D&sprefix=true%2Belements%2B%2Caps%2C255&sr=8-5&th=1&linkCode=ll2&tag=eatsmart-21&linkId=2f3f95a22c5c5f81967d3a2b51d1e930&ref_=as_li_ss_tl",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/61hKwTsa-GL._SX679_.jpg",
    amazonLink: "https://www.amazon.in/True-Elements-Chia-Seeds-250g/dp/B01M6ZAIXL?crid=1ZSKE9VP8C7LX&dib=eyJ2IjoiMSJ9.Q1bQkNAROLJT9i2aNeMhUcAU9EnmxY9ATWcVwSzi0zwv6n0hX4n4057U-QqH9bs2U0222KkB4ZhpWEiBGZ0rYQmRbZEwzx3wQk5t7Hzto4kVUv90ZX7pXJtWRTyl6lV14fh5cj18Wk_0bJxhD5Tx-D8f4TB7KQpTSokKyw8Xue6BL0Estu2eXYQDwv_YXR8xSOT35-gOOob8yJtL-bgChViIoeMa0pFRyCZXaVjf-EkVUpsE2FZdog0NLKzaLxGOpBigQFpexLa36CW7xoixBcAjj4-LbWepB7QXBiRO-mY.B6XP_aVU_dAThuZJPXC5TTS0jkRTGNxTSYTXDOkAa5o&dib_tag=se&keywords=true%2Belements%2Bseeds&nsdOptOutParam=true&qid=1784108553&sprefix=true%2Belements%2Bseed%2Caps%2C279&sr=8-2-spons&aref=RJujtQ2pCM&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll2&tag=eatsmart-21&linkId=fd45c5835b98c4dd8492795129e35c53&ref_=as_li_ss_tl",
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/41q3jP1WX5L._SY300_SX300_QL70_FMwebp_.jpg",
    amazonLink: "https://www.amazon.in/True-Elements-Flax-Seeds-500g/dp/B06XW6F9QG?crid=1ZSKE9VP8C7LX&dib=eyJ2IjoiMSJ9.Q1bQkNAROLJT9i2aNeMhUcAU9EnmxY9ATWcVwSzi0zwv6n0hX4n4057U-QqH9bs2U0222KkB4ZhpWEiBGZ0rYQmRbZEwzx3wQk5t7Hzto4kVUv90ZX7pXJtWRTyl6lV14fh5cj18Wk_0bJxhD5Tx-D8f4TB7KQpTSokKyw8Xue6BL0Estu2eXYQDwv_YXR8xSOT35-gOOob8yJtL-bgChViIoeMa0pFRyCZXaVjf-EkVUpsE2FZdog0NLKzaLxGOpBigQFpexLa36CW7xoixBcAjj4-LbWepB7QXBiRO-mY.B6XP_aVU_dAThuZJPXC5TTS0jkRTGNxTSYTXDOkAa5o&dib_tag=se&keywords=true%2Belements%2Bseeds&nsdOptOutParam=true&qid=1784108553&sbo=m6DjfpMzMLDmL8pSMKX8hw%3D%3D&sprefix=true%2Belements%2Bseed%2Caps%2C279&sr=8-6&th=1&linkCode=ll2&tag=eatsmart-21&linkId=917300884923a787ff4a117c4640f7cd&ref_=as_li_ss_tl",
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/71Y5PGUmk8L._SL1500_.jpg",
    amazonLink: "https://link.amazon/B06GeKday",
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
