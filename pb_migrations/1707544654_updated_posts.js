/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b7e6q4c7pcx12ep")

  // remove
  collection.schema.removeField("eim2m6tu")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b7e6q4c7pcx12ep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eim2m6tu",
    "name": "field",
    "type": "date",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
