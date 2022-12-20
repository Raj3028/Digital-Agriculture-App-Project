# Nodejs_Assignment


#Goal#

Need to develop an app that offers common functionality for digital agriculture apps (such as
OAuth-based Single Sign-On, properties, seasons, field records, etc). The API is built on HTTP and is
mostly RESTful: It has predictable resource URLs, returns HTTP response codes to indicate errors. It
also accepts and returns JSON in the HTTP body.


Functional Overview

####General Concepts

->Organization
An Organization is a master entity that has a set of properties. This entity groups and controls all the
resources involved in the culture, for instance, different crops, seasons, etc.

->Property
A property is the representation of a farm with a set of regions and fields. Basically, an organization
can have multiple properties.

->Region
The platform has a system of hierarchical representation of geographical structures, composed
of Fields and Regions. A region may contain fields or other regions. Regions work like trees: a region
can be a root or a node - when it contains other child regions - or a leaf - when it is an actual field,
defined by a specific geometry.

->Field
A field is a specialization of a region. Fields are specifically identified as the leaf of the region tree. It
is specifically the only entity which has an actual polygon that describes its size and position in the
world.


Crop Cycle
What is a Crop Cycle?
The Crop Cycle is a generical entity responsible for grouping a list of fields with a crop assigned over
time.

Crop Cycle Property
Crop Cycle Property is the association of a Crop Cycle to a property (or part of its fields). This way a
property can have different cycles running at the same time, depending on the type of crops that are
cultivated in this property.

Crop Cycle Field
Crop Cycle Field is a cycle defined to a field of a property. This way the property can have multiple
cycles assigned depending on how many fields with different crops it has.


Crop
A crop is something that can be grown and harvested extensively for profit or subsistence. E.g:
Soybean, Cotton, Coffee.


####Expectations####
- Clean maintainable code
- Unit tests (TDD would be ideal)
- Suitable data modelling
- OAuth implementation
- Working solution – if possible do send us the postman collection.


Good To Have
- Optimizations and scalable design at the API and DB level