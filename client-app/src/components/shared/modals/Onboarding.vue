<template>
    <div>
        <button class="btn btn--sm btn--default" data-toggle="modal" data-target="#startOnboarding">Modify Chargeback</button>
        <div class="modal fade" id="startOnboarding" tabindex="-1" role="dialog" aria-labelledby="startOnboarding">
         <!-- Modal Dialog -->
        <div class="modal__dialog modal__dialog--sm" role="document">
            <!-- Modal content -->
            <div class="modal__content">
                <!-- Modal Body -->
                <div class="modal__body modal__body--pad">
                    <div class="modal--section__left">
                        <form @submit.prevent="" class="form__pad">
                        <div class="form__item">
                            <label for="resolveComment" class="form__label">Comment</label>
                            <textarea name="" id="resolveComment" cols="30" rows="4" class="form__input"></textarea>
                        </div>
                        <div class="divider divider--horizontal--full"></div>
                        <div class="mt-40 mb--15">
                            <label for="">Chargeback Resolution</label>
                        </div>
                        <div class="radio">
                            <!-- radio item -->
                            <div class="radio__item inlineBlock">
                                <input id="resolveWon" value="won" type="radio" name="resolutionStatus" class="radio__item__input">
                                <label for="resolveWon" class="radio__item__label">Won</label>
                            </div>
                            <div class="radio__item inlineBlock">
                                <input id="resolveLost" value="lost" type="radio" name="resolutionStatus" class="radio__item__input">
                                <label for="resolveLost" class="radio__item__label">Lost</label>
                            </div>
                        </div>

                        <div class="form__item">
                            <div class="form__note__content">
                                <div class="panel__content--backgroundYellow">
                                <span class="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <g fill="none" fill-rule="evenodd">
                                        <circle cx="8" cy="8" r="8" fill="#cacaca"/>
                                        <text fill="#FFF" font-family="SFProText-Regular, SF Pro Text" font-size="9.6">
                                            <tspan x="6.6" y="11.4">!</tspan>
                                        </text>
                                    </g>
                                </svg>
                            </span>
                                    The chargeback amount will be debited from the merchant’s
                                    next settlement.
                                </div>

                            </div>
                        </div>
                        <div class="form__footer no--padding__xr">
                            <button class="btn btn--default" type="button" data-dismiss="modal" aria-label="Close">Cancel</button>
                            <button class="btn btn--bgOrange"  type="submit">Resolve chargeback</button>
                        </div>
                    </form>
                    </div>
                    <div class="modal--section__right">

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    
</template>


<script>
export default {
    name: 'OnboardingModal'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
