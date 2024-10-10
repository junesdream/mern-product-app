import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),

	createProduct: async (newProduct) => {
		if (
			!newProduct.name ||
			!newProduct.price ||
			!newProduct.description ||
			!newProduct.countInStock ||
			!newProduct.image
		) {
			return { success: false, message: "Please fill in all fields." };
		}

		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					success: false,
					message: errorData.message || "Error creating product",
				};
			}
			const data = await res.json();
			set((state) => ({ products: [...state.products, data.data] }));

			return { success: true, message: "Product created successfully" };
		} catch (error) {
			console.error("Error in createProduct:", error);
			return { success: false, message: "Server error" };
		}
	},
}));
