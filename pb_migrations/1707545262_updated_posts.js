/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b7e6q4c7pcx12ep")

  // remove
  collection.schema.removeField("62m2mfuw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b7e6q4c7pcx12ep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "62m2mfuw",
    "name": "streak",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
