import { z } from "zod";

export const schemaProduct = z.object({
  title: z.string().nonempty(),
  brand: z.string().nonempty(),
  description: z.string().optional(),
  images: z.array(z.any()).optional(),
  sizes: z.array(z.any()).optional(),
  colors: z.array(
    z.object({
      color: z.string().nonempty(),
      price: z.number().min(0),
      discountPrice: z.number().min(0),
      discountPercentage: z.number().optional(),
      image: z.union([
        z.string().url(),
        z.instanceof(File).refine((file) => file.size > 0),
      ]),
    })
  ),
  salesCount: z.number().min(0),
});
export const schemaAccessory = z.object({
  title: z.string().nonempty(),
  category: z.string().nonempty(),
  description: z.string().optional(),
  price: z.number().min(0),
  discountPrice: z.number().min(0),
  discountPercentage: z.number().optional(),
  image: z.union([
    z.string().url("Vui lòng chọn ảnh"),
    z.instanceof(File).refine((file) => file.size > 0),
  ]),
  salesCount: z.number().min(0),
});

export const OrderSchema = z.object({
  shippingDetails: z.object({
    name: z.string().nonempty("Vui lòng nhập họ và tên!"),
    address: z.object({
      streetAddress: z.string().nonempty("Vui lòng nhập địa chỉ!"),
      province: z.string().nonempty(),
      district: z.string().nonempty(),
      ward: z.string().nonempty(),
    }),
    phone: z
      .string()
      .min(1, "Số điện thoại là bắt buộc")
      .regex(/^[0-9]+$/, "Số điện thoại phải là số"),
  }),
});

export const categorySchema = z.object({
  title: z.string().min(3),
});

export const brandSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
});
