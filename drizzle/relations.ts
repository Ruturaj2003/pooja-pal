import { relations } from "drizzle-orm/relations";
import { items, onlineOrderItems, onlineOrders, purchaseOrderItems, purchaseOrders, salesItems, sales, suppliers } from "./schema";

export const onlineOrderItemsRelations = relations(onlineOrderItems, ({one}) => ({
	item: one(items, {
		fields: [onlineOrderItems.ooiItemId],
		references: [items.id]
	}),
	onlineOrder: one(onlineOrders, {
		fields: [onlineOrderItems.ooiOnlineOrderId],
		references: [onlineOrders.id]
	}),
}));

export const itemsRelations = relations(items, ({many}) => ({
	onlineOrderItems: many(onlineOrderItems),
	purchaseOrderItems: many(purchaseOrderItems),
	salesItems: many(salesItems),
}));

export const onlineOrdersRelations = relations(onlineOrders, ({many}) => ({
	onlineOrderItems: many(onlineOrderItems),
}));

export const purchaseOrderItemsRelations = relations(purchaseOrderItems, ({one}) => ({
	item: one(items, {
		fields: [purchaseOrderItems.poiItemId],
		references: [items.id]
	}),
	purchaseOrder: one(purchaseOrders, {
		fields: [purchaseOrderItems.poiPurchaseOrderId],
		references: [purchaseOrders.id]
	}),
}));

export const purchaseOrdersRelations = relations(purchaseOrders, ({one, many}) => ({
	purchaseOrderItems: many(purchaseOrderItems),
	supplier: one(suppliers, {
		fields: [purchaseOrders.pOrderSupplier],
		references: [suppliers.id]
	}),
}));

export const salesItemsRelations = relations(salesItems, ({one}) => ({
	item: one(items, {
		fields: [salesItems.siItemId],
		references: [items.id]
	}),
	sale: one(sales, {
		fields: [salesItems.siSalesId],
		references: [sales.id]
	}),
}));

export const salesRelations = relations(sales, ({many}) => ({
	salesItems: many(salesItems),
}));

export const suppliersRelations = relations(suppliers, ({many}) => ({
	purchaseOrders: many(purchaseOrders),
}));