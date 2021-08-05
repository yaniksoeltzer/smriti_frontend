import PomoFactory from "./pomoFactory";


describe('PomoFactory', ()=>{
    let pCounter = new PomoFactory()
    it('should be a class', ()=>{
        expect(pCounter).toBeDefined()
    })
    it('should have a finishedPomos property', ()=>{
        expect(pCounter.finishedPomoTypes).toBeDefined()
    })

    it('should return a work pomo as the first pomo', ()=>{
        expect(pCounter.expectedNextPomoType).toEqual("work")
    })
    describe('typically pomo order', ()=>{
        let expectedPomoTypes = [
            "work","break",
            "work","break",
            "work","break",
            "work","big break"
        ]
        pCounter.finishedPomoTypes = []
        for (let i = 0; i < 3; i++){
            describe('at the '+(i+1)+'th iteration', ()=>{
                for(let j = 0; j < expectedPomoTypes.length; j++){
                    describe('at the '+(j+1)+'th position', ()=> {
                        it("should return expected Pomo type", ()=>{
                            expect(pCounter.expectedNextPomoType).toEqual(expectedPomoTypes[j])
                            pCounter.finishedPomoTypes.push(expectedPomoTypes[j])
                        })
                    })
                }
            })
        }
    })

    it("should ignore previous big breaks", ()=>{
        pCounter.finishedPomoTypes = ["work", "big break", "work", "work", "work"]
        expect(pCounter.expectedNextPomoType).toEqual("big break")
        pCounter.finishedPomoTypes = ["work",  "work", "big break", "work", "work"]
        expect(pCounter.expectedNextPomoType).toEqual("big break")
    })
    it('should return work after a big break', ()=>{
        pCounter.finishedPomoTypes = ["work",  "work",  "work", "work", "big break"]
        expect(pCounter.expectedNextPomoType).toEqual("work")
    })

})
