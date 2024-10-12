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
	fetchProducts: async () => {
		try {
			const res = await fetch("/api/products");
			if (!res.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await res.json();
			set({ products: data.data });
		} catch (error) {
			console.error("Error in fetchProducts:", error);
		}
	},
	deleteProduct: async (pid) => {
		try {
			const res = await fetch(`/api/products/${pid}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					success: false,
					message: errorData.message || "Failed to delete product",
				};
			}
			//update the ui directly, without a refreshing page
			set((state) => ({
				products: state.products.filter(
					(product) => product._id !== pid
				),
			}));

			return { 
				success: true,
				message: "Product deleted successfully",
			};
		} catch (error) {
			console.error("Error in deleteProduct:", error);
			return {
				success: false,
				message: "Server error while deleting product",
			};
		}
	},
	updateProduct: async (pid, updateProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateProduct),
		}); 
		const data = await res.json();
		if(!data.success) return { success:false, message: data.message };

		//update ui directly, without refreshing page
		set((state) => ({
			products: state.products.map((product) =>
				product._id === pid ? data.data : product
			),
		}));
		return { success: true, message: data.message };
	},
}));
  