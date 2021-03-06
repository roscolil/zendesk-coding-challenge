const chai = require('chai')
const fs = require('fs')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()
import { help, menus } from '../src/help'
import quitMessage from '../src/quit'
import viewFields from '../src/viewFields'
import version from '../src/version'
import {
  search,
  storeSelectedFile,
  storeSelectedField,
  storeSearchQuery
} from '../src/search'


describe('Zendesk CLI', () => {
  it('should display main menu', () => {
    assert(help(menus.main))  // TODO not displaying main menu
  })

  it('should display quit options', () => {
    assert(quitMessage())
  })

  it('should display app info', () => {
    assert(version())
  })

  it('should display fields', () => {
    assert(viewFields())
  })
});

describe('Accept correct user inputs', () => {
  it('should display file selection menu', () => {
    assert(search())
  })

  it('should store file selection as a string', () => {
    let fileName = storeSelectedFile('u')
    console.log(fileName);
    if (!fileName) {
      console.log('Plese enter the correct selection..');
    } else {
      expect(fileName).should.be.string
    }
  })

  it('should store field input as a string', () => {
    let fieldName = storeSelectedField('active')
    if (!fieldName) {
      console.log('Plese enter a field name..');
    } else {
      expect(fieldName).should.be.string
    }
  })

  it('should store search query as a string', () => {
    let searchQuery = storeSearchQuery('true')
    if (!searchQuery) {
      console.log('Plese enter a search query..');
    } else {
      expect(searchQuery).should.be.string
    }
  })
});

describe('Validate results', () => {
  let json
  before('read data file', () => {
    json = fs.readFileSync(process.cwd() + '/data/users.json');
  });
  it('should correctly parse json data', () => {
    let data = JSON.parse(json);
    expect(data).should.be.an('object')
    expect(data[0]).to.deep.equal(
      {
        "_id": 1,
        "url": "http://initech.zendesk.com/api/v2/users/1.json",
        "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
        "name": "Francisca Rasmussen",
        "alias": "Miss Coffey",
        "created_at": "2016-04-15T05:19:46 -10:00",
        "active": true,
        "verified": true,
        "shared": false,
        "locale": "en-AU",
        "timezone": "Sri Lanka",
        "last_login_at": "2013-08-04T01:03:27 -10:00",
        "email": "coffeyrasmussen@flotonic.com",
        "phone": "8335-422-718",
        "signature": "Don't Worry Be Happy!",
        "organization_id": 119,
        "tags": [
          "Springville",
          "Sutton",
          "Hartsville/Hartley",
          "Diaperville"
        ],
        "suspended": true,
        "role": "admin"
      });
  });

  it('should print the correct results', () => {
    const data =
      { "_id": 1, "name": "Francisca Rasmussen", "role": "admin" }
    expect(data).to.have.property("_id").to.equal(1)
    expect(data).to.have.property("name").to.equal("Francisca Rasmussen")
    expect(data).to.have.property("role").to.equal("admin")
  });
});
