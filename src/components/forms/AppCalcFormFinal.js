

const AppCalcFormFinal = () => {
    return (
        <form onSubmit={(e) => {e.preventDefault(); makeOrder(e)}} >
        <div class="product-list">
          {receivedDocs.map((doc, index) => <app-calc-doc-item          
            key={index}
            docItem={doc}
            orderDocId={doc.id}
          />)}
        </div>
        <div class="form-bottom">
          <div class="form-bottom__price">
            <div class="form-bottom__price-txt">Итого:</div>
            <div class="form-bottom__price-wrapper">
              <div class="form-bottom__price-outdated" v-if="price.old_price">
                { price.old_price | filterRub } ₽
              </div>
              <div class="form-bottom__price-total">
                { price.price | filterRub } ₽
              </div>
            </div>
          </div>
          <button class="btn btn-send-order btn--primary btn--l" type="submit">
            Оформить заказ
          </button>
        </div>
      </form >
    );
};

export default AppCalcFormFinal;