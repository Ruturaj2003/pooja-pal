import { relations } from "drizzle-orm/relations";
import { items, onlineOrderItems, onlineOrders, suppliers, purchaseOrders, purchaseOrderItems, salesItems, sales } from "./schema";

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

export const purchaseOrdersRelations = relations(purchaseOrders, ({one, many}) => ({
	supplier: one(suppliers, {
		fields: [purchaseOrders.pOrderSupplier],
		references: [suppliers.id]
	}),
	purchaseOrderItems: many(purchaseOrderItems),
}));

export const suppliersRelations = relations(suppliers, ({many}) => ({
	purchaseOrders: many(purchaseOrders),
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